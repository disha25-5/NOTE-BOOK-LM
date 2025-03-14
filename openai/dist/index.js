import { LLMAgentWorker, LLMAgent } from '@llamaindex/core/agent';
import { Settings } from '@llamaindex/core/global';
import { wrapEventCaller, wrapLLMEvent } from '@llamaindex/core/decorator';
import { ToolCallLLM } from '@llamaindex/core/llms';
import { extractText } from '@llamaindex/core/utils';
import { getEnv, process } from '@llamaindex/env';
import { Tokenizers } from '@llamaindex/env/tokenizers';
import { BaseEmbedding } from '@llamaindex/core/embeddings';

var name = "@llamaindex/openai";
var version = "0.1.61";
var pkg = {
	name: name,
	version: version};

// NOTE we're not supporting the legacy models as they're not available for new deployments
// https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/legacy-models
// If you have a need for them, please open an issue on GitHub
const ALL_AZURE_OPENAI_CHAT_MODELS = {
    "gpt-35-turbo": {
        contextWindow: 4096,
        openAIModel: "gpt-3.5-turbo"
    },
    "gpt-35-turbo-16k": {
        contextWindow: 16384,
        openAIModel: "gpt-3.5-turbo-16k"
    },
    "gpt-4o": {
        contextWindow: 128000,
        openAIModel: "gpt-4o"
    },
    "gpt-4o-mini": {
        contextWindow: 128000,
        openAIModel: "gpt-4o-mini"
    },
    "gpt-4": {
        contextWindow: 8192,
        openAIModel: "gpt-4"
    },
    "gpt-4-32k": {
        contextWindow: 32768,
        openAIModel: "gpt-4-32k"
    },
    "gpt-4-turbo": {
        contextWindow: 128000,
        openAIModel: "gpt-4-turbo"
    },
    "gpt-4-turbo-2024-04-09": {
        contextWindow: 128000,
        openAIModel: "gpt-4-turbo"
    },
    "gpt-4-vision-preview": {
        contextWindow: 128000,
        openAIModel: "gpt-4-vision-preview"
    },
    "gpt-4-1106-preview": {
        contextWindow: 128000,
        openAIModel: "gpt-4-1106-preview"
    },
    "gpt-4o-2024-05-13": {
        contextWindow: 128000,
        openAIModel: "gpt-4o-2024-05-13"
    },
    "gpt-4o-mini-2024-07-18": {
        contextWindow: 128000,
        openAIModel: "gpt-4o-mini-2024-07-18"
    }
};
const ALL_AZURE_OPENAI_EMBEDDING_MODELS = {
    "text-embedding-ada-002": {
        dimensions: 1536,
        openAIModel: "text-embedding-ada-002",
        maxTokens: 8191
    },
    "text-embedding-3-small": {
        dimensions: 1536,
        dimensionOptions: [
            512,
            1536
        ],
        openAIModel: "text-embedding-3-small",
        maxTokens: 8191
    },
    "text-embedding-3-large": {
        dimensions: 3072,
        dimensionOptions: [
            256,
            1024,
            3072
        ],
        openAIModel: "text-embedding-3-large",
        maxTokens: 8191
    }
};
// Current version list found here - https://learn.microsoft.com/en-us/azure/ai-services/openai/reference
// const ALL_AZURE_API_VERSIONS = [
//   "2022-12-01",
//   "2023-05-15",
//   "2023-06-01-preview", // Maintained for DALL-E 2
//   "2023-10-01-preview",
//   "2024-02-01",
//   "2024-02-15-preview",
//   "2024-03-01-preview",
//   "2024-04-01-preview",
//   "2024-05-01-preview",
//   "2024-06-01",
// ];
const DEFAULT_API_VERSION = "2023-05-15";
//^ NOTE: this will change over time, if you want to pin it, use a specific version
function getAzureConfigFromEnv(init) {
    const deployment = init && "deploymentName" in init && typeof init.deploymentName === "string" ? init?.deploymentName : init?.deployment ?? getEnv("AZURE_OPENAI_DEPLOYMENT") ?? // From Azure docs
    getEnv("AZURE_OPENAI_API_DEPLOYMENT_NAME") ?? // LCJS compatible
    init?.model; // Fall back to model name, Python compatible
    return {
        apiKey: init?.apiKey ?? getEnv("AZURE_OPENAI_KEY") ?? // From Azure docs
        getEnv("OPENAI_API_KEY") ?? // Python compatible
        getEnv("AZURE_OPENAI_API_KEY"),
        endpoint: init?.endpoint ?? getEnv("AZURE_OPENAI_ENDPOINT") ?? // From Azure docs
        getEnv("OPENAI_API_BASE") ?? // Python compatible
        getEnv("AZURE_OPENAI_API_INSTANCE_NAME"),
        apiVersion: init?.apiVersion ?? getEnv("AZURE_OPENAI_API_VERSION") ?? // From Azure docs
        getEnv("OPENAI_API_VERSION") ?? // Python compatible
        getEnv("AZURE_OPENAI_API_VERSION") ?? // LCJS compatible
        DEFAULT_API_VERSION,
        deployment
    };
}
function getAzureModel(openAIModel) {
    for (const [key, value] of Object.entries(ALL_AZURE_OPENAI_EMBEDDING_MODELS)){
        if (value.openAIModel === openAIModel) {
            return key;
        }
    }
    for (const [key, value] of Object.entries(ALL_AZURE_OPENAI_CHAT_MODELS)){
        if (value.openAIModel === openAIModel) {
            return key;
        }
    }
    throw new Error(`Unknown model: ${openAIModel}`);
}
function shouldUseAzure() {
    return getEnv("AZURE_OPENAI_ENDPOINT") || getEnv("AZURE_OPENAI_API_INSTANCE_NAME") || getEnv("OPENAI_API_TYPE") === "azure";
}
// This mixin adds a User-Agent header to the request for Azure OpenAI
function AzureOpenAIWithUserAgent(Base) {
    return class AzureOpenAI extends Base {
        // Define a new public method that wraps the base class's defaultHeaders
        defaultHeaders(opts) {
            const baseHeaders = super.defaultHeaders(opts);
            return {
                ...baseHeaders,
                "User-Agent": `${pkg.name}/${pkg.version} (node.js/${process.version}; ${process.platform}; ${process.arch}) ${baseHeaders["User-Agent"] || ""}`
            };
        }
    };
}

function applyDecs2203RFactory() {
    function createAddInitializerMethod(initializers, decoratorFinishedRef) {
        return function addInitializer(initializer) {
            assertNotFinished(decoratorFinishedRef, "addInitializer");
            assertCallable(initializer, "An initializer");
            initializers.push(initializer);
        };
    }
    function memberDec(dec, name, desc, initializers, kind, isStatic, isPrivate, metadata, value) {
        var kindStr;
        switch(kind){
            case 1:
                kindStr = "accessor";
                break;
            case 2:
                kindStr = "method";
                break;
            case 3:
                kindStr = "getter";
                break;
            case 4:
                kindStr = "setter";
                break;
            default:
                kindStr = "field";
        }
        var ctx = {
            kind: kindStr,
            name: isPrivate ? "#" + name : name,
            static: isStatic,
            private: isPrivate,
            metadata: metadata
        };
        var decoratorFinishedRef = {
            v: false
        };
        ctx.addInitializer = createAddInitializerMethod(initializers, decoratorFinishedRef);
        var get, set;
        if (kind === 0) {
            if (isPrivate) {
                get = desc.get;
                set = desc.set;
            } else {
                get = function() {
                    return this[name];
                };
                set = function(v) {
                    this[name] = v;
                };
            }
        } else if (kind === 2) {
            get = function() {
                return desc.value;
            };
        } else {
            if (kind === 1 || kind === 3) {
                get = function() {
                    return desc.get.call(this);
                };
            }
            if (kind === 1 || kind === 4) {
                set = function(v) {
                    desc.set.call(this, v);
                };
            }
        }
        ctx.access = get && set ? {
            get: get,
            set: set
        } : get ? {
            get: get
        } : {
            set: set
        };
        try {
            return dec(value, ctx);
        } finally{
            decoratorFinishedRef.v = true;
        }
    }
    function assertNotFinished(decoratorFinishedRef, fnName) {
        if (decoratorFinishedRef.v) {
            throw new Error("attempted to call " + fnName + " after decoration was finished");
        }
    }
    function assertCallable(fn, hint) {
        if (typeof fn !== "function") {
            throw new TypeError(hint + " must be a function");
        }
    }
    function assertValidReturnValue(kind, value) {
        var type = typeof value;
        if (kind === 1) {
            if (type !== "object" || value === null) {
                throw new TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
            }
            if (value.get !== undefined) {
                assertCallable(value.get, "accessor.get");
            }
            if (value.set !== undefined) {
                assertCallable(value.set, "accessor.set");
            }
            if (value.init !== undefined) {
                assertCallable(value.init, "accessor.init");
            }
        } else if (type !== "function") {
            var hint;
            if (kind === 0) {
                hint = "field";
            } else if (kind === 10) {
                hint = "class";
            } else {
                hint = "method";
            }
            throw new TypeError(hint + " decorators must return a function or void 0");
        }
    }
    function applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers, metadata) {
        var decs = decInfo[0];
        var desc, init, value;
        if (isPrivate) {
            if (kind === 0 || kind === 1) {
                desc = {
                    get: decInfo[3],
                    set: decInfo[4]
                };
            } else if (kind === 3) {
                desc = {
                    get: decInfo[3]
                };
            } else if (kind === 4) {
                desc = {
                    set: decInfo[3]
                };
            } else {
                desc = {
                    value: decInfo[3]
                };
            }
        } else if (kind !== 0) {
            desc = Object.getOwnPropertyDescriptor(base, name);
        }
        if (kind === 1) {
            value = {
                get: desc.get,
                set: desc.set
            };
        } else if (kind === 2) {
            value = desc.value;
        } else if (kind === 3) {
            value = desc.get;
        } else if (kind === 4) {
            value = desc.set;
        }
        var newValue, get, set;
        if (typeof decs === "function") {
            newValue = memberDec(decs, name, desc, initializers, kind, isStatic, isPrivate, metadata, value);
            if (newValue !== void 0) {
                assertValidReturnValue(kind, newValue);
                if (kind === 0) {
                    init = newValue;
                } else if (kind === 1) {
                    init = newValue.init;
                    get = newValue.get || value.get;
                    set = newValue.set || value.set;
                    value = {
                        get: get,
                        set: set
                    };
                } else {
                    value = newValue;
                }
            }
        } else {
            for(var i = decs.length - 1; i >= 0; i--){
                var dec = decs[i];
                newValue = memberDec(dec, name, desc, initializers, kind, isStatic, isPrivate, metadata, value);
                if (newValue !== void 0) {
                    assertValidReturnValue(kind, newValue);
                    var newInit;
                    if (kind === 0) {
                        newInit = newValue;
                    } else if (kind === 1) {
                        newInit = newValue.init;
                        get = newValue.get || value.get;
                        set = newValue.set || value.set;
                        value = {
                            get: get,
                            set: set
                        };
                    } else {
                        value = newValue;
                    }
                    if (newInit !== void 0) {
                        if (init === void 0) {
                            init = newInit;
                        } else if (typeof init === "function") {
                            init = [
                                init,
                                newInit
                            ];
                        } else {
                            init.push(newInit);
                        }
                    }
                }
            }
        }
        if (kind === 0 || kind === 1) {
            if (init === void 0) {
                init = function(instance, init) {
                    return init;
                };
            } else if (typeof init !== "function") {
                var ownInitializers = init;
                init = function(instance, init) {
                    var value = init;
                    for(var i = 0; i < ownInitializers.length; i++){
                        value = ownInitializers[i].call(instance, value);
                    }
                    return value;
                };
            } else {
                var originalInitializer = init;
                init = function(instance, init) {
                    return originalInitializer.call(instance, init);
                };
            }
            ret.push(init);
        }
        if (kind !== 0) {
            if (kind === 1) {
                desc.get = value.get;
                desc.set = value.set;
            } else if (kind === 2) {
                desc.value = value;
            } else if (kind === 3) {
                desc.get = value;
            } else if (kind === 4) {
                desc.set = value;
            }
            if (isPrivate) {
                if (kind === 1) {
                    ret.push(function(instance, args) {
                        return value.get.call(instance, args);
                    });
                    ret.push(function(instance, args) {
                        return value.set.call(instance, args);
                    });
                } else if (kind === 2) {
                    ret.push(value);
                } else {
                    ret.push(function(instance, args) {
                        return value.call(instance, args);
                    });
                }
            } else {
                Object.defineProperty(base, name, desc);
            }
        }
    }
    function applyMemberDecs(Class, decInfos, metadata) {
        var ret = [];
        var protoInitializers;
        var staticInitializers;
        var existingProtoNonFields = new Map();
        var existingStaticNonFields = new Map();
        for(var i = 0; i < decInfos.length; i++){
            var decInfo = decInfos[i];
            if (!Array.isArray(decInfo)) continue;
            var kind = decInfo[1];
            var name = decInfo[2];
            var isPrivate = decInfo.length > 3;
            var isStatic = kind >= 5;
            var base;
            var initializers;
            if (isStatic) {
                base = Class;
                kind = kind - 5;
                staticInitializers = staticInitializers || [];
                initializers = staticInitializers;
            } else {
                base = Class.prototype;
                protoInitializers = protoInitializers || [];
                initializers = protoInitializers;
            }
            if (kind !== 0 && !isPrivate) {
                var existingNonFields = isStatic ? existingStaticNonFields : existingProtoNonFields;
                var existingKind = existingNonFields.get(name) || 0;
                if (existingKind === true || existingKind === 3 && kind !== 4 || existingKind === 4 && kind !== 3) {
                    throw new Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + name);
                } else if (!existingKind && kind > 2) {
                    existingNonFields.set(name, kind);
                } else {
                    existingNonFields.set(name, true);
                }
            }
            applyMemberDec(ret, base, decInfo, name, kind, isStatic, isPrivate, initializers, metadata);
        }
        pushInitializers(ret, protoInitializers);
        pushInitializers(ret, staticInitializers);
        return ret;
    }
    function pushInitializers(ret, initializers) {
        if (initializers) {
            ret.push(function(instance) {
                for(var i = 0; i < initializers.length; i++){
                    initializers[i].call(instance);
                }
                return instance;
            });
        }
    }
    function applyClassDecs(targetClass, classDecs, metadata) {
        if (classDecs.length > 0) {
            var initializers = [];
            var newClass = targetClass;
            var name = targetClass.name;
            for(var i = classDecs.length - 1; i >= 0; i--){
                var decoratorFinishedRef = {
                    v: false
                };
                try {
                    var nextNewClass = classDecs[i](newClass, {
                        kind: "class",
                        name: name,
                        addInitializer: createAddInitializerMethod(initializers, decoratorFinishedRef),
                        metadata
                    });
                } finally{
                    decoratorFinishedRef.v = true;
                }
                if (nextNewClass !== undefined) {
                    assertValidReturnValue(10, nextNewClass);
                    newClass = nextNewClass;
                }
            }
            return [
                defineMetadata(newClass, metadata),
                function() {
                    for(var i = 0; i < initializers.length; i++){
                        initializers[i].call(newClass);
                    }
                }
            ];
        }
    }
    function defineMetadata(Class, metadata) {
        return Object.defineProperty(Class, Symbol.metadata || Symbol.for("Symbol.metadata"), {
            configurable: true,
            enumerable: true,
            value: metadata
        });
    }
    return function applyDecs2203R(targetClass, memberDecs, classDecs, parentClass) {
        if (parentClass !== void 0) {
            var parentMetadata = parentClass[Symbol.metadata || Symbol.for("Symbol.metadata")];
        }
        var metadata = Object.create(parentMetadata === void 0 ? null : parentMetadata);
        var e = applyMemberDecs(targetClass, memberDecs, metadata);
        if (!classDecs.length) defineMetadata(targetClass, metadata);
        return {
            e: e,
            get c () {
                return applyClassDecs(targetClass, classDecs, metadata);
            }
        };
    };
}
function _apply_decs_2203_r(targetClass, memberDecs, classDecs, parentClass) {
    return (_apply_decs_2203_r = applyDecs2203RFactory())(targetClass, memberDecs, classDecs, parentClass);
}
var _initProto;
const GPT4_MODELS = {
    "chatgpt-4o-latest": {
        contextWindow: 128000
    },
    "gpt-4.5-preview": {
        contextWindow: 128000
    },
    "gpt-4.5-preview-2025-02-27": {
        contextWindow: 128000
    },
    "gpt-4": {
        contextWindow: 8192
    },
    "gpt-4-32k": {
        contextWindow: 32768
    },
    "gpt-4-32k-0613": {
        contextWindow: 32768
    },
    "gpt-4-turbo": {
        contextWindow: 128000
    },
    "gpt-4-turbo-preview": {
        contextWindow: 128000
    },
    "gpt-4-1106-preview": {
        contextWindow: 128000
    },
    "gpt-4-0125-preview": {
        contextWindow: 128000
    },
    "gpt-4-vision-preview": {
        contextWindow: 128000
    },
    "gpt-4o": {
        contextWindow: 128000
    },
    "gpt-4o-2024-05-13": {
        contextWindow: 128000
    },
    "gpt-4o-mini": {
        contextWindow: 128000
    },
    "gpt-4o-mini-2024-07-18": {
        contextWindow: 128000
    },
    "gpt-4o-2024-08-06": {
        contextWindow: 128000
    },
    "gpt-4o-2024-09-14": {
        contextWindow: 128000
    },
    "gpt-4o-2024-10-14": {
        contextWindow: 128000
    },
    "gpt-4-0613": {
        contextWindow: 128000
    },
    "gpt-4-turbo-2024-04-09": {
        contextWindow: 128000
    },
    "gpt-4-0314": {
        contextWindow: 128000
    },
    "gpt-4-32k-0314": {
        contextWindow: 32768
    },
    "gpt-4o-realtime-preview": {
        contextWindow: 128000
    },
    "gpt-4o-realtime-preview-2024-10-01": {
        contextWindow: 128000
    },
    "gpt-4o-audio-preview": {
        contextWindow: 128000
    },
    "gpt-4o-audio-preview-2024-10-01": {
        contextWindow: 128000
    },
    "gpt-4o-2024-11-20": {
        contextWindow: 128000
    },
    "gpt-4o-audio-preview-2024-12-17": {
        contextWindow: 128000
    },
    "gpt-4o-mini-audio-preview": {
        contextWindow: 128000
    },
    "gpt-4o-mini-audio-preview-2024-12-17": {
        contextWindow: 128000
    }
};
// NOTE we don't currently support gpt-3.5-turbo-instruct and don't plan to in the near future
const GPT35_MODELS = {
    "gpt-3.5-turbo": {
        contextWindow: 16385
    },
    "gpt-3.5-turbo-0613": {
        contextWindow: 4096
    },
    "gpt-3.5-turbo-16k": {
        contextWindow: 16385
    },
    "gpt-3.5-turbo-16k-0613": {
        contextWindow: 16385
    },
    "gpt-3.5-turbo-1106": {
        contextWindow: 16385
    },
    "gpt-3.5-turbo-0125": {
        contextWindow: 16385
    },
    "gpt-3.5-turbo-0301": {
        contextWindow: 16385
    }
};
const O1_MODELS = {
    "o1-preview": {
        contextWindow: 128000
    },
    "o1-preview-2024-09-12": {
        contextWindow: 128000
    },
    "o1-mini": {
        contextWindow: 128000
    },
    "o1-mini-2024-09-12": {
        contextWindow: 128000
    },
    o1: {
        contextWindow: 128000
    },
    "o1-2024-12-17": {
        contextWindow: 128000
    }
};
const O3_MODELS = {
    "o3-mini": {
        contextWindow: 200000
    },
    "o3-mini-2025-01-31": {
        contextWindow: 200000
    }
};
/**
 * We currently support GPT-3.5 and GPT-4 models
 */ const ALL_AVAILABLE_OPENAI_MODELS = {
    ...GPT4_MODELS,
    ...GPT35_MODELS,
    ...O1_MODELS,
    ...O3_MODELS
};
function isFunctionCallingModel(llm) {
    let model;
    if (llm instanceof OpenAI) {
        model = llm.model;
    } else if ("model" in llm && typeof llm.model === "string") {
        model = llm.model;
    } else {
        return false;
    }
    const isChatModel = Object.keys(ALL_AVAILABLE_OPENAI_MODELS).includes(model);
    const isOld = model.includes("0314") || model.includes("0301");
    const isO1 = model.startsWith("o1");
    return isChatModel && !isOld && !isO1;
}
function isReasoningModel(model) {
    const isO1 = model.startsWith("o1");
    const isO3 = model.startsWith("o3");
    return isO1 || isO3;
}
function isTemperatureSupported(model) {
    return !model.startsWith("o3");
}
class OpenAI extends ToolCallLLM {
    static{
        ({ e: [_initProto] } = _apply_decs_2203_r(this, [
            [
                [
                    wrapEventCaller,
                    wrapLLMEvent
                ],
                2,
                "chat"
            ],
            [
                wrapEventCaller,
                2,
                "streamChat"
            ]
        ], []));
    }
    #session;
    get session() {
        if (!this.#session) {
            this.#session = this.lazySession();
        }
        return this.#session;
    }
    constructor(init){
        super(), // OpenAI session params
        this.apiKey = (_initProto(this), undefined), this.baseURL = undefined, this.#session = null;
        this.model = init?.model ?? "gpt-4o";
        this.temperature = init?.temperature ?? 0.1;
        this.reasoningEffort = isReasoningModel(this.model) ? init?.reasoningEffort : undefined;
        this.topP = init?.topP ?? 1;
        this.maxTokens = init?.maxTokens ?? undefined;
        this.maxRetries = init?.maxRetries ?? 10;
        this.timeout = init?.timeout ?? 60 * 1000; // Default is 60 seconds
        this.additionalChatOptions = init?.additionalChatOptions;
        this.additionalSessionOptions = init?.additionalSessionOptions;
        this.apiKey = init?.session?.apiKey ?? init?.apiKey ?? getEnv("OPENAI_API_KEY");
        this.baseURL = init?.session?.baseURL ?? init?.baseURL ?? getEnv("OPENAI_BASE_URL");
        if (init?.azure || shouldUseAzure()) {
            const azureConfig = {
                ...getAzureConfigFromEnv({
                    model: getAzureModel(this.model)
                }),
                ...init?.azure
            };
            this.lazySession = async ()=>init?.session ?? import('openai').then(({ AzureOpenAI })=>{
                    AzureOpenAI = AzureOpenAIWithUserAgent(AzureOpenAI);
                    return new AzureOpenAI({
                        maxRetries: this.maxRetries,
                        timeout: this.timeout,
                        ...this.additionalSessionOptions,
                        ...azureConfig
                    });
                });
        } else {
            this.lazySession = async ()=>init?.session ?? import('openai').then(({ OpenAI })=>{
                    return new OpenAI({
                        apiKey: this.apiKey,
                        baseURL: this.baseURL,
                        maxRetries: this.maxRetries,
                        timeout: this.timeout,
                        ...this.additionalSessionOptions
                    });
                });
        }
    }
    get supportToolCall() {
        return isFunctionCallingModel(this);
    }
    get metadata() {
        const contextWindow = ALL_AVAILABLE_OPENAI_MODELS[this.model]?.contextWindow ?? 1024;
        return {
            model: this.model,
            temperature: this.temperature,
            topP: this.topP,
            maxTokens: this.maxTokens,
            contextWindow,
            tokenizer: Tokenizers.CL100K_BASE
        };
    }
    static toOpenAIRole(messageType) {
        switch(messageType){
            case "user":
                return "user";
            case "assistant":
                return "assistant";
            case "system":
                return "system";
            default:
                return "user";
        }
    }
    static toOpenAIMessage(messages) {
        return messages.map((message)=>{
            const options = message.options ?? {};
            if ("toolResult" in options) {
                return {
                    tool_call_id: options.toolResult.id,
                    role: "tool",
                    content: extractText(message.content)
                };
            } else if ("toolCall" in options) {
                return {
                    role: "assistant",
                    content: extractText(message.content),
                    tool_calls: options.toolCall.map((toolCall)=>{
                        return {
                            id: toolCall.id,
                            type: "function",
                            function: {
                                name: toolCall.name,
                                arguments: typeof toolCall.input === "string" ? toolCall.input : JSON.stringify(toolCall.input)
                            }
                        };
                    })
                };
            } else if (message.role === "user") {
                return {
                    role: "user",
                    content: message.content
                };
            }
            const response = {
                // fixme(alex): type assertion
                role: OpenAI.toOpenAIRole(message.role),
                // fixme: should not extract text, but assert content is string
                content: extractText(message.content)
            };
            return response;
        });
    }
    async chat(params) {
        const { messages, stream, tools, additionalChatOptions } = params;
        const baseRequestParams = {
            model: this.model,
            temperature: this.temperature,
            reasoning_effort: this.reasoningEffort,
            max_tokens: this.maxTokens,
            tools: tools?.map(OpenAI.toTool),
            messages: OpenAI.toOpenAIMessage(messages),
            top_p: this.topP,
            ...Object.assign({}, this.additionalChatOptions, additionalChatOptions)
        };
        if (Array.isArray(baseRequestParams.tools) && baseRequestParams.tools.length === 0) {
            // remove empty tools array to avoid OpenAI error
            delete baseRequestParams.tools;
        }
        if (!isTemperatureSupported(baseRequestParams.model)) delete baseRequestParams.temperature;
        // Streaming
        if (stream) {
            return this.streamChat(baseRequestParams);
        }
        // Non-streaming
        const response = await (await this.session).chat.completions.create({
            ...baseRequestParams,
            stream: false
        });
        const content = response.choices[0].message?.content ?? "";
        return {
            raw: response,
            message: {
                content,
                role: response.choices[0].message.role,
                options: response.choices[0].message?.tool_calls ? {
                    toolCall: response.choices[0].message.tool_calls.map((toolCall)=>({
                            id: toolCall.id,
                            name: toolCall.function.name,
                            input: toolCall.function.arguments
                        }))
                } : {}
            }
        };
    }
    // todo: this wrapper is ugly, refactor it
    async *streamChat(baseRequestParams) {
        const stream = await (await this.session).chat.completions.create({
            ...baseRequestParams,
            stream: true
        });
        // TODO: add callback to streamConverter and use streamConverter here
        // this will be used to keep track of the current tool call, make sure input are valid json object.
        let currentToolCall = null;
        const toolCallMap = new Map();
        for await (const part of stream){
            if (part.choices.length === 0) {
                if (part.usage) {
                    yield {
                        raw: part,
                        delta: ""
                    };
                }
                continue;
            }
            const choice = part.choices[0];
            // skip parts that don't have any content
            if (!(choice.delta.content || choice.delta.tool_calls || choice.finish_reason)) continue;
            let shouldEmitToolCall = null;
            if (choice.delta.tool_calls?.[0].id && currentToolCall && choice.delta.tool_calls?.[0].id !== currentToolCall.id) {
                shouldEmitToolCall = {
                    ...currentToolCall,
                    input: JSON.parse(currentToolCall.input)
                };
            }
            if (choice.delta.tool_calls?.[0].id) {
                currentToolCall = {
                    name: choice.delta.tool_calls[0].function.name,
                    id: choice.delta.tool_calls[0].id,
                    input: choice.delta.tool_calls[0].function.arguments
                };
                toolCallMap.set(choice.delta.tool_calls[0].id, currentToolCall);
            } else {
                if (choice.delta.tool_calls?.[0].function?.arguments) {
                    currentToolCall.input += choice.delta.tool_calls[0].function.arguments;
                }
            }
            const isDone = choice.finish_reason !== null;
            if (isDone && currentToolCall) {
                // for the last one, we need to emit the tool call
                shouldEmitToolCall = {
                    ...currentToolCall,
                    input: JSON.parse(currentToolCall.input)
                };
            }
            yield {
                raw: part,
                options: shouldEmitToolCall ? {
                    toolCall: [
                        shouldEmitToolCall
                    ]
                } : currentToolCall ? {
                    toolCall: [
                        currentToolCall
                    ]
                } : {},
                delta: choice.delta.content ?? ""
            };
        }
        toolCallMap.clear();
        return;
    }
    static toTool(tool) {
        return {
            type: "function",
            function: tool.metadata.parameters ? {
                name: tool.metadata.name,
                description: tool.metadata.description,
                parameters: tool.metadata.parameters
            } : {
                name: tool.metadata.name,
                description: tool.metadata.description
            }
        };
    }
}
/**
 * Convenience function to create a new OpenAI instance.
 * @param init - Optional initialization parameters for the OpenAI instance.
 * @returns A new OpenAI instance.
 */ const openai = (init)=>new OpenAI(init);

class OpenAIAgentWorker extends LLMAgentWorker {
}
class OpenAIAgent extends LLMAgent {
    constructor(params){
        const llm = params.llm ?? (Settings.llm instanceof OpenAI ? Settings.llm : new OpenAI());
        super({
            ...params,
            llm
        });
    }
}

const ALL_OPENAI_EMBEDDING_MODELS = {
    "text-embedding-ada-002": {
        dimensions: 1536,
        maxTokens: 8192,
        tokenizer: Tokenizers.CL100K_BASE
    },
    "text-embedding-3-small": {
        dimensions: 1536,
        dimensionOptions: [
            512,
            1536
        ],
        maxTokens: 8192,
        tokenizer: Tokenizers.CL100K_BASE
    },
    "text-embedding-3-large": {
        dimensions: 3072,
        dimensionOptions: [
            256,
            1024,
            3072
        ],
        maxTokens: 8192,
        tokenizer: Tokenizers.CL100K_BASE
    }
};
class OpenAIEmbedding extends BaseEmbedding {
    #session;
    get session() {
        if (!this.#session) {
            this.#session = this.lazySession();
        }
        return this.#session;
    }
    /**
   * OpenAI Embedding
   * @param init - initial parameters
   */ constructor(init){
        super(), // OpenAI session params
        /** api key */ this.apiKey = undefined, /** base url */ this.baseURL = undefined, this.#session = null, /**
   * Get embeddings for a batch of texts
   * @param texts
   */ this.getTextEmbeddings = async (texts)=>{
            return this.getOpenAIEmbedding(texts);
        };
        this.model = init?.model ?? "text-embedding-ada-002";
        this.dimensions = init?.dimensions; // if no dimensions provided, will be undefined/not sent to OpenAI
        this.embedBatchSize = init?.embedBatchSize ?? 10;
        this.maxRetries = init?.maxRetries ?? 10;
        this.timeout = init?.timeout ?? 60 * 1000; // Default is 60 seconds
        this.additionalSessionOptions = init?.additionalSessionOptions;
        // find metadata for model
        const key = Object.keys(ALL_OPENAI_EMBEDDING_MODELS).find((key)=>key === this.model);
        if (key) {
            this.embedInfo = ALL_OPENAI_EMBEDDING_MODELS[key];
        }
        if (init?.azure || shouldUseAzure()) {
            const azureConfig = {
                ...getAzureConfigFromEnv({
                    model: getAzureModel(this.model)
                }),
                ...init?.azure
            };
            this.apiKey = init?.session?.apiKey ?? azureConfig.apiKey ?? getEnv("OPENAI_API_KEY");
            this.baseURL = init?.session?.baseURL ?? azureConfig.baseURL ?? getEnv("OPENAI_BASE_URL");
            this.lazySession = async ()=>import('openai').then(async ({ AzureOpenAI })=>{
                    AzureOpenAI = AzureOpenAIWithUserAgent(AzureOpenAI);
                    return init?.session ?? new AzureOpenAI({
                        maxRetries: this.maxRetries,
                        timeout: this.timeout,
                        ...this.additionalSessionOptions,
                        ...azureConfig
                    });
                });
        } else {
            this.apiKey = init?.session?.apiKey ?? init?.apiKey ?? getEnv("OPENAI_API_KEY");
            this.baseURL = init?.session?.baseURL ?? init?.baseURL ?? getEnv("OPENAI_BASE_URL");
            this.lazySession = async ()=>import('openai').then(({ OpenAI })=>{
                    return init?.session ?? new OpenAI({
                        apiKey: this.apiKey,
                        baseURL: this.baseURL,
                        maxRetries: this.maxRetries,
                        timeout: this.timeout,
                        ...this.additionalSessionOptions
                    });
                });
        }
    }
    /**
   * Get embeddings for a batch of texts
   * @param texts
   * @param options
   */ async getOpenAIEmbedding(input) {
        // TODO: ensure this for every sub class by calling it in the base class
        input = this.truncateMaxTokens(input);
        const { data } = await (await this.session).embeddings.create(this.dimensions ? {
            model: this.model,
            dimensions: this.dimensions,
            input
        } : {
            model: this.model,
            input
        });
        return data.map((d)=>d.embedding);
    }
    /**
   * Get embeddings for a single text
   * @param text
   */ async getTextEmbedding(text) {
        return (await this.getOpenAIEmbedding([
            text
        ]))[0];
    }
}

export { ALL_AVAILABLE_OPENAI_MODELS, ALL_OPENAI_EMBEDDING_MODELS, GPT35_MODELS, GPT4_MODELS, O1_MODELS, O3_MODELS, OpenAI, OpenAIAgent, OpenAIAgentWorker, OpenAIEmbedding, openai };
