import { path, AsyncLocalStorage, randomUUID, CustomEvent, getEnv } from '@llamaindex/env';
import { tokenizers } from '@llamaindex/env/tokenizers';

//#region llm
const DEFAULT_CONTEXT_WINDOW = 3900;
const DEFAULT_NUM_OUTPUTS = 256;
const DEFAULT_CHUNK_SIZE = 1024;
const DEFAULT_CHUNK_OVERLAP = 20;
const DEFAULT_CHUNK_OVERLAP_RATIO = 0.1;
const DEFAULT_PADDING = 5;
//#endregion
//#region storage
const DEFAULT_COLLECTION = "data";
const DEFAULT_PERSIST_DIR = path.join("./storage");
const DEFAULT_INDEX_STORE_PERSIST_FILENAME = "index_store.json";
const DEFAULT_DOC_STORE_PERSIST_FILENAME = "doc_store.json";
const DEFAULT_VECTOR_STORE_PERSIST_FILENAME = "vector_store.json";
const DEFAULT_GRAPH_STORE_PERSIST_FILENAME = "graph_store.json";
const DEFAULT_NAMESPACE = "docstore";
//#endregion
//#region llama cloud
const DEFAULT_PROJECT_NAME = "Default";
const DEFAULT_BASE_URL = "https://api.cloud.llamaindex.ai"; //#endregion

const eventReasonAsyncLocalStorage = new AsyncLocalStorage();
/**
 * EventCaller is used to track the caller of an event.
 */ class EventCaller {
    constructor(caller, parent){
        this.caller = caller;
        this.parent = parent;
        this.id = randomUUID();
        this.#computedCallers = null;
    }
    #computedCallers;
    get computedCallers() {
        if (this.#computedCallers != null) {
            return this.#computedCallers;
        }
        const callers = [
            this.caller
        ];
        let parent = this.parent;
        while(parent != null){
            callers.push(parent.caller);
            parent = parent.parent;
        }
        this.#computedCallers = callers;
        return callers;
    }
    static create(caller, parent) {
        return new EventCaller(caller, parent);
    }
}
function getEventCaller() {
    return eventReasonAsyncLocalStorage.getStore() ?? null;
}
/**
 * @param caller who is calling this function, pass in `this` if it's a class method
 * @param fn
 */ function withEventCaller(caller, fn) {
    // create a chain of event callers
    const parentCaller = getEventCaller();
    return eventReasonAsyncLocalStorage.run(EventCaller.create(caller, parentCaller), fn);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class LlamaIndexCustomEvent extends CustomEvent {
    constructor(event, options){
        super(event, options), this.reason = null;
        this.reason = options?.reason ?? null;
    }
    static fromEvent(type, detail) {
        return new LlamaIndexCustomEvent(type, {
            detail: detail,
            reason: getEventCaller()
        });
    }
}
class CallbackManager {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    #handlers;
    on(event, handler) {
        if (!this.#handlers.has(event)) {
            this.#handlers.set(event, []);
        }
        this.#handlers.get(event).push(handler);
        return this;
    }
    off(event, handler) {
        if (!this.#handlers.has(event)) {
            return this;
        }
        const cbs = this.#handlers.get(event);
        const index = cbs.indexOf(handler);
        if (index > -1) {
            cbs.splice(index, 1);
        }
        return this;
    }
    dispatchEvent(event, detail, sync = false) {
        const cbs = this.#handlers.get(event);
        if (!cbs) {
            return;
        }
        if (typeof queueMicrotask === "undefined") {
            console.warn("queueMicrotask is not available, dispatching synchronously");
            sync = true;
        }
        if (sync) {
            cbs.forEach((handler)=>handler(LlamaIndexCustomEvent.fromEvent(event, {
                    ...detail
                })));
        } else {
            queueMicrotask(()=>{
                cbs.forEach((handler)=>handler(LlamaIndexCustomEvent.fromEvent(event, {
                        ...detail
                    })));
            });
        }
    }
    constructor(){
        this.#handlers = new Map();
    }
}
const globalCallbackManager = new CallbackManager();
const callbackManagerAsyncLocalStorage = new AsyncLocalStorage();
let currentCallbackManager = globalCallbackManager;
function getCallbackManager() {
    return callbackManagerAsyncLocalStorage.getStore() ?? currentCallbackManager;
}
function setCallbackManager(callbackManager) {
    currentCallbackManager = callbackManager;
}
function withCallbackManager(callbackManager, fn) {
    return callbackManagerAsyncLocalStorage.run(callbackManager, fn);
}

const chunkSizeAsyncLocalStorage$1 = new AsyncLocalStorage();
let globalChunkSize = 1024;
function getChunkSize() {
    return chunkSizeAsyncLocalStorage$1.getStore() ?? globalChunkSize;
}
function setChunkSize(chunkSize) {
    if (chunkSize !== undefined) {
        globalChunkSize = chunkSize;
    }
}
function withChunkSize(embeddedModel, fn) {
    return chunkSizeAsyncLocalStorage$1.run(embeddedModel, fn);
}

const embeddedModelAsyncLocalStorage = new AsyncLocalStorage();
let globalEmbeddedModel = null;
function getEmbeddedModel() {
    const currentEmbeddedModel = embeddedModelAsyncLocalStorage.getStore() ?? globalEmbeddedModel;
    if (!currentEmbeddedModel) {
        throw new Error("Cannot find Embedding, please set `Settings.embedModel = ...` on the top of your code");
    }
    return currentEmbeddedModel;
}
function setEmbeddedModel(embeddedModel) {
    globalEmbeddedModel = embeddedModel;
}
function withEmbeddedModel(embeddedModel, fn) {
    return embeddedModelAsyncLocalStorage.run(embeddedModel, fn);
}

const llmAsyncLocalStorage = new AsyncLocalStorage();
let globalLLM;
function getLLM() {
    const currentLLM = llmAsyncLocalStorage.getStore() ?? globalLLM;
    if (!currentLLM) {
        throw new Error("Cannot find LLM, please set `Settings.llm = ...` on the top of your code");
    }
    return currentLLM;
}
function setLLM(llm) {
    globalLLM = llm;
}
function withLLM(llm, fn) {
    return llmAsyncLocalStorage.run(llm, fn);
}

const chunkSizeAsyncLocalStorage = new AsyncLocalStorage();
let globalTokenizer = tokenizers.tokenizer();
function getTokenizer() {
    return chunkSizeAsyncLocalStorage.getStore() ?? globalTokenizer;
}
function setTokenizer(tokenizer) {
    if (tokenizer !== undefined) {
        globalTokenizer = tokenizer;
    }
}
function withTokenizer(tokenizer, fn) {
    return chunkSizeAsyncLocalStorage.run(tokenizer, fn);
}

const Settings = {
    get llm () {
        return getLLM();
    },
    set llm (llm){
        setLLM(llm);
    },
    withLLM (llm1, fn) {
        return withLLM(llm1, fn);
    },
    get embedModel () {
        return getEmbeddedModel();
    },
    set embedModel (embedModel){
        setEmbeddedModel(embedModel);
    },
    withEmbedModel (embedModel1, fn) {
        return withEmbeddedModel(embedModel1, fn);
    },
    get tokenizer () {
        return getTokenizer();
    },
    set tokenizer (tokenizer){
        setTokenizer(tokenizer);
    },
    withTokenizer (tokenizer1, fn) {
        return withTokenizer(tokenizer1, fn);
    },
    get chunkSize () {
        return getChunkSize();
    },
    set chunkSize (chunkSize){
        setChunkSize(chunkSize);
    },
    withChunkSize (chunkSize1, fn) {
        return withChunkSize(chunkSize1, fn);
    },
    get callbackManager () {
        return getCallbackManager();
    },
    set callbackManager (callbackManager){
        setCallbackManager(callbackManager);
    },
    withCallbackManager (callbackManager1, fn) {
        return withCallbackManager(callbackManager1, fn);
    },
    get debug () {
        let debug = getEnv("DEBUG");
        if (typeof window !== "undefined") {
            debug ||= window.localStorage.debug;
        }
        return Boolean(debug) && debug?.includes("llamaindex") || debug === "*" || debug === "true";
    }
};

export { CallbackManager, DEFAULT_BASE_URL, DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_OVERLAP_RATIO, DEFAULT_CHUNK_SIZE, DEFAULT_COLLECTION, DEFAULT_CONTEXT_WINDOW, DEFAULT_DOC_STORE_PERSIST_FILENAME, DEFAULT_GRAPH_STORE_PERSIST_FILENAME, DEFAULT_INDEX_STORE_PERSIST_FILENAME, DEFAULT_NAMESPACE, DEFAULT_NUM_OUTPUTS, DEFAULT_PADDING, DEFAULT_PERSIST_DIR, DEFAULT_PROJECT_NAME, DEFAULT_VECTOR_STORE_PERSIST_FILENAME, EventCaller, Settings, getEventCaller, withEventCaller };
