Object.defineProperty(exports, '__esModule', { value: true });

var env = require('@llamaindex/env');
var index_cjs$3 = require('../../chat-engine/dist/index.cjs');
var index_cjs$4 = require('../../decorator/dist/index.cjs');
var index_cjs$1 = require('../../global/dist/index.cjs');
var index_cjs$5 = require('../../memory/dist/index.cjs');
var index_cjs$2 = require('../../schema/dist/index.cjs');
var zod = require('zod');
var index_cjs = require('../../utils/dist/index.cjs');

// #TODO stepTools and stepToolsStreaming should be moved to a better abstraction
async function stepToolsStreaming({ response, tools, step, enqueueOutput }) {
    const responseChunkStream = new ReadableStream({
        async start (controller) {
            for await (const chunk of response){
                controller.enqueue(chunk);
            }
            controller.close();
        }
    });
    const [pipStream, finalStream] = responseChunkStream.tee();
    const reader = pipStream.getReader();
    const { value } = await reader.read();
    reader.releaseLock();
    if (value === undefined) {
        throw new Error("first chunk value is undefined, this should not happen");
    }
    // check if first chunk has tool calls, if so, this is a function call
    // otherwise, it's a regular message
    const hasToolCall = !!(value.options && "toolCall" in value.options);
    enqueueOutput({
        taskStep: step,
        output: finalStream,
        isLast: !hasToolCall
    });
    if (hasToolCall) {
        // you need to consume the response to get the full toolCalls
        const toolCalls = new Map();
        for await (const chunk of pipStream){
            if (chunk.options && "toolCall" in chunk.options) {
                const toolCall = chunk.options.toolCall;
                toolCall.forEach((toolCall)=>{
                    toolCalls.set(toolCall.id, toolCall);
                });
            }
        }
        // If there are toolCalls, but they didn't get read into the stream, used for Gemini
        if (!toolCalls.size && value.options && "toolCall" in value.options) {
            value.options.toolCall.forEach((toolCall)=>{
                toolCalls.set(toolCall.id, toolCall);
            });
        }
        step.context.store.messages = [
            ...step.context.store.messages,
            {
                role: "assistant",
                content: "",
                options: {
                    toolCall: [
                        ...toolCalls.values()
                    ]
                }
            }
        ];
        for (const toolCall of toolCalls.values()){
            const targetTool = tools.find((tool)=>tool.metadata.name === toolCall.name);
            const toolOutput = await callTool(targetTool, toolCall, step.context.logger);
            step.context.store.messages = [
                ...step.context.store.messages,
                {
                    role: "user",
                    content: index_cjs.stringifyJSONToMessageContent(toolOutput.output),
                    options: {
                        toolResult: {
                            result: toolOutput.output,
                            isError: toolOutput.isError,
                            id: toolCall.id
                        }
                    }
                }
            ];
            step.context.store.toolOutputs.push(toolOutput);
        }
    }
}
async function stepTools({ response, tools, step, enqueueOutput }) {
    step.context.store.messages = [
        ...step.context.store.messages,
        response.message
    ];
    const options = response.message.options ?? {};
    enqueueOutput({
        taskStep: step,
        output: response,
        isLast: !("toolCall" in options)
    });
    if ("toolCall" in options) {
        const { toolCall } = options;
        for (const call of toolCall){
            const targetTool = tools.find((tool)=>tool.metadata.name === call.name);
            const toolOutput = await callTool(targetTool, call, step.context.logger);
            step.context.store.toolOutputs.push(toolOutput);
            step.context.store.messages = [
                ...step.context.store.messages,
                {
                    content: index_cjs.stringifyJSONToMessageContent(toolOutput.output),
                    role: "user",
                    options: {
                        toolResult: {
                            result: toolOutput.output,
                            isError: toolOutput.isError,
                            id: call.id
                        }
                    }
                }
            ];
        }
    }
}
async function callTool(tool, toolCall, logger) {
    let input;
    if (typeof toolCall.input === "string") {
        try {
            input = JSON.parse(toolCall.input);
        } catch (e) {
            const output = `Tool ${toolCall.name} can't be called. Input is not a valid JSON object.`;
            logger.error(`${output} Try increasing the maxTokens parameter of your LLM. Invalid Input: ${toolCall.input}`);
            return {
                tool,
                input: {},
                output,
                isError: true
            };
        }
    } else {
        input = toolCall.input;
    }
    if (!tool) {
        logger.error(`Tool ${toolCall.name} does not exist.`);
        const output = `Tool ${toolCall.name} does not exist.`;
        return {
            tool,
            input,
            output,
            isError: true
        };
    }
    const call = tool.call;
    let output;
    if (!call) {
        logger.error(`Tool ${tool.metadata.name} (remote:${toolCall.name}) does not have a implementation.`);
        output = `Tool ${tool.metadata.name} (remote:${toolCall.name}) does not have a implementation.`;
        return {
            tool,
            input,
            output,
            isError: true
        };
    }
    try {
        index_cjs$1.Settings.callbackManager.dispatchEvent("llm-tool-call", {
            toolCall: {
                ...toolCall,
                input
            }
        });
        output = await call.call(tool, input);
        logger.log(`Tool ${tool.metadata.name} (remote:${toolCall.name}) succeeded.`);
        logger.log(`Output: ${JSON.stringify(output)}`);
        const toolOutput = {
            tool,
            input,
            output,
            isError: false
        };
        index_cjs$1.Settings.callbackManager.dispatchEvent("llm-tool-result", {
            toolCall: {
                ...toolCall,
                input
            },
            toolResult: {
                ...toolOutput
            }
        });
        return toolOutput;
    } catch (e) {
        output = index_cjs.prettifyError(e);
        logger.error(`Tool ${tool.metadata.name} (remote:${toolCall.name}) failed: ${output}`);
    }
    return {
        tool,
        input,
        output,
        isError: true
    };
}
async function consumeAsyncIterable(input, previousContent = "") {
    if (index_cjs.isAsyncIterable(input)) {
        const result = {
            content: previousContent,
            // only assistant will give streaming response
            role: "assistant",
            options: {}
        };
        for await (const chunk of input){
            result.content += chunk.delta;
            if (chunk.options) {
                result.options = {
                    ...result.options,
                    ...chunk.options
                };
            }
        }
        return result;
    } else {
        return input;
    }
}
function createReadableStream(asyncIterable) {
    return new ReadableStream({
        async start (controller) {
            for await (const chunk of asyncIterable){
                controller.enqueue(chunk);
            }
            controller.close();
        }
    });
}
function validateAgentParams(params) {
    if ("tools" in params) {
        zod.z.array(index_cjs$2.baseToolWithCallSchema).parse(params.tools);
    }
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
var _computedKey, _initProto;
const MAX_TOOL_CALLS = 10;
function createTaskOutputStream(handler, context) {
    const steps = [];
    return new ReadableStream({
        pull: async (controller)=>{
            const step = {
                id: env.randomUUID(),
                context,
                prevStep: null,
                nextSteps: new Set()
            };
            if (steps.length > 0) {
                step.prevStep = steps[steps.length - 1];
            }
            const taskOutputs = [];
            steps.push(step);
            const enqueueOutput = (output)=>{
                context.logger.log("Enqueueing output for step(id, %s).", step.id);
                taskOutputs.push(output);
                controller.enqueue(output);
            };
            index_cjs$1.Settings.callbackManager.dispatchEvent("agent-start", {
                startStep: step
            });
            context.logger.log("Starting step(id, %s).", step.id);
            await handler(step, enqueueOutput);
            context.logger.log("Finished step(id, %s).", step.id);
            // fixme: support multi-thread when there are multiple outputs
            // todo: for now we pretend there is only one task output
            const { isLast, taskStep } = taskOutputs[0];
            context = {
                ...taskStep.context,
                store: {
                    ...taskStep.context.store
                },
                toolCallCount: 1
            };
            if (isLast) {
                context.logger.log("Final step(id, %s) reached, closing task.", step.id);
                index_cjs$1.Settings.callbackManager.dispatchEvent("agent-end", {
                    endStep: step
                });
                controller.close();
            }
        }
    });
}
_computedKey = Symbol.toStringTag;
/**
 * Worker will schedule tasks and handle the task execution
 */ class AgentWorker {
    #taskSet;
    createTask(query, context) {
        context.store.messages.push({
            role: "user",
            content: query
        });
        const taskOutputStream = createTaskOutputStream(this.taskHandler, context);
        return new ReadableStream({
            pull: async (controller)=>{
                for await (const stepOutput of taskOutputStream){
                    this.#taskSet.add(stepOutput.taskStep);
                    if (stepOutput.isLast) {
                        let currentStep = stepOutput.taskStep;
                        while(currentStep){
                            this.#taskSet.delete(currentStep);
                            currentStep = currentStep.prevStep;
                        }
                        const { output, taskStep } = stepOutput;
                        if (output instanceof ReadableStream) {
                            let content = "";
                            let options = undefined;
                            const transformedStream = output.pipeThrough(new TransformStream({
                                transform (chunk, controller) {
                                    content += chunk.delta;
                                    if (!options && chunk.options) {
                                        options = chunk.options;
                                    }
                                    controller.enqueue(chunk); // Pass the chunk through unchanged
                                },
                                // When stream finishes, store the accumulated message in context
                                flush () {
                                    taskStep.context.store.messages = [
                                        ...taskStep.context.store.messages,
                                        {
                                            role: "assistant",
                                            content,
                                            options
                                        }
                                    ];
                                }
                            }));
                            stepOutput.output = transformedStream;
                        }
                        controller.enqueue(stepOutput);
                        controller.close();
                    } else {
                        controller.enqueue(stepOutput);
                    }
                }
            }
        });
    }
    constructor(){
        this.#taskSet = new Set();
        this[_computedKey] = "AgentWorker";
    }
}
/**
 * Runner will manage the task execution and provide a high-level API for the user
 */ class AgentRunner extends index_cjs$3.BaseChatEngine {
    static{
        ({ e: [_initProto] } = _apply_decs_2203_r(this, [
            [
                index_cjs$4.wrapEventCaller,
                2,
                "chat"
            ]
        ], []));
    }
    #llm;
    #tools;
    #systemPrompt;
    #chatHistory;
    #runner;
    #verbose;
    static defaultCreateStore() {
        return Object.create(null);
    }
    static{
        this.defaultTaskHandler = async (step, enqueueOutput)=>{
            const { llm, getTools, stream, additionalChatOptions } = step.context;
            const lastMessage = step.context.store.messages.at(-1).content;
            const tools = await getTools(lastMessage);
            if (!stream) {
                const response = await llm.chat({
                    stream,
                    tools,
                    messages: [
                        ...step.context.store.messages
                    ],
                    additionalChatOptions
                });
                await stepTools({
                    response,
                    tools,
                    step,
                    enqueueOutput
                });
            } else {
                const response = await llm.chat({
                    stream,
                    tools,
                    messages: [
                        ...step.context.store.messages
                    ],
                    additionalChatOptions
                });
                await stepToolsStreaming({
                    response,
                    tools,
                    step,
                    enqueueOutput
                });
            }
        };
    }
    constructor(params){
        super(), this.#systemPrompt = (_initProto(this), null);
        const { llm, chatHistory, systemPrompt, runner, tools, verbose } = params;
        this.#llm = llm;
        this.#chatHistory = chatHistory;
        this.#runner = runner;
        if (systemPrompt) {
            this.#systemPrompt = systemPrompt;
        }
        this.#tools = tools;
        this.#verbose = verbose;
    }
    get llm() {
        return this.#llm;
    }
    get chatHistory() {
        return this.#chatHistory;
    }
    get verbose() {
        return index_cjs$1.Settings.debug || this.#verbose;
    }
    reset() {
        this.#chatHistory = [];
    }
    getTools(query) {
        return typeof this.#tools === "function" ? this.#tools(query) : this.#tools;
    }
    static shouldContinue(task) {
        return task.context.toolCallCount < MAX_TOOL_CALLS;
    }
    createTask(message, stream = false, verbose = undefined, chatHistory, additionalChatOptions) {
        const initialMessages = [
            ...chatHistory ?? this.#chatHistory
        ];
        if (this.#systemPrompt !== null) {
            const systemPrompt = this.#systemPrompt;
            const alreadyHasSystemPrompt = initialMessages.filter((msg)=>msg.role === "system").some((msg)=>Object.is(msg.content, systemPrompt));
            if (!alreadyHasSystemPrompt) {
                initialMessages.push({
                    content: systemPrompt,
                    role: "system"
                });
            }
        }
        return this.#runner.createTask(message, {
            stream,
            toolCallCount: 0,
            llm: this.#llm,
            additionalChatOptions: additionalChatOptions ?? {},
            getTools: (message)=>this.getTools(message),
            store: {
                ...this.createStore(),
                messages: initialMessages,
                toolOutputs: []
            },
            shouldContinue: AgentRunner.shouldContinue,
            logger: // disable verbose if explicitly set to false
            verbose === false ? env.emptyLogger : verbose || this.verbose ? env.consoleLogger : env.emptyLogger
        });
    }
    async chat(params) {
        let chatHistory = [];
        if (params.chatHistory instanceof index_cjs$5.BaseMemory) {
            chatHistory = await params.chatHistory.getMessages();
        } else {
            chatHistory = params.chatHistory;
        }
        const task = this.createTask(params.message, !!params.stream, false, chatHistory, params.chatOptions);
        for await (const stepOutput of task){
            // update chat history for each round
            this.#chatHistory = [
                ...stepOutput.taskStep.context.store.messages
            ];
            if (stepOutput.isLast) {
                const { output } = stepOutput;
                if (output instanceof ReadableStream) {
                    return output.pipeThrough(new TransformStream({
                        transform (chunk, controller) {
                            controller.enqueue(index_cjs$2.EngineResponse.fromChatResponseChunk(chunk));
                        }
                    }));
                } else {
                    return index_cjs$2.EngineResponse.fromChatResponse(output);
                }
            }
        }
        throw new Error("Task ended without a last step.");
    }
}

class LLMAgentWorker extends AgentWorker {
    constructor(...args){
        super(...args), this.taskHandler = AgentRunner.defaultTaskHandler;
    }
}
class LLMAgent extends AgentRunner {
    constructor(params){
        validateAgentParams(params);
        const llm = params.llm ?? (index_cjs$1.Settings.llm ? index_cjs$1.Settings.llm : null);
        if (!llm) throw new Error("llm must be provided for either in params or Settings.llm");
        super({
            llm,
            chatHistory: params.chatHistory ?? [],
            systemPrompt: params.systemPrompt ?? null,
            runner: new LLMAgentWorker(),
            tools: "tools" in params ? params.tools : params.toolRetriever.retrieve.bind(params.toolRetriever),
            verbose: params.verbose ?? false
        }), this.createStore = AgentRunner.defaultCreateStore, this.taskHandler = AgentRunner.defaultTaskHandler;
    }
}

exports.AgentRunner = AgentRunner;
exports.AgentWorker = AgentWorker;
exports.LLMAgent = LLMAgent;
exports.LLMAgentWorker = LLMAgentWorker;
exports.callTool = callTool;
exports.consumeAsyncIterable = consumeAsyncIterable;
exports.createReadableStream = createReadableStream;
exports.stepTools = stepTools;
exports.stepToolsStreaming = stepToolsStreaming;
exports.validateAgentParams = validateAgentParams;
