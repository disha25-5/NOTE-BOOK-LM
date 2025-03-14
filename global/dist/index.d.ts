import { Tokenizer } from '@llamaindex/env/tokenizers';
import { BaseEmbedding } from '../../embeddings/dist/index.js';
import { ChatMessage, ChatResponse, ToolCall, ToolOutput, ChatResponseChunk, LLM } from '../../llms/dist/index.js';
import { CustomEvent } from '@llamaindex/env';
import { AgentStartEvent, AgentEndEvent } from '../../agent/dist/index.js';
import { QueryStartEvent, QueryEndEvent } from '../../query-engine/dist/index.js';
import { SynthesizeStartEvent, SynthesizeEndEvent } from '../../response-synthesizers/dist/index.js';
import { RetrieveStartEvent, RetrieveEndEvent } from '../../retriever/dist/index.js';
import { TextNode } from '../../schema/dist/index.js';

declare const DEFAULT_CONTEXT_WINDOW = 3900;
declare const DEFAULT_NUM_OUTPUTS = 256;
declare const DEFAULT_CHUNK_SIZE = 1024;
declare const DEFAULT_CHUNK_OVERLAP = 20;
declare const DEFAULT_CHUNK_OVERLAP_RATIO = 0.1;
declare const DEFAULT_PADDING = 5;
declare const DEFAULT_COLLECTION = "data";
declare const DEFAULT_PERSIST_DIR: string;
declare const DEFAULT_INDEX_STORE_PERSIST_FILENAME = "index_store.json";
declare const DEFAULT_DOC_STORE_PERSIST_FILENAME = "doc_store.json";
declare const DEFAULT_VECTOR_STORE_PERSIST_FILENAME = "vector_store.json";
declare const DEFAULT_GRAPH_STORE_PERSIST_FILENAME = "graph_store.json";
declare const DEFAULT_NAMESPACE = "docstore";
declare const DEFAULT_PROJECT_NAME = "Default";
declare const DEFAULT_BASE_URL = "https://api.cloud.llamaindex.ai";

type UUID = `${string}-${string}-${string}-${string}-${string}`;
type JSONValue = string | number | boolean | JSONObject | JSONArray;
type JSONObject = {
    [key: string]: JSONValue;
};
type JSONArray = Array<JSONValue>;

/**
 * EventCaller is used to track the caller of an event.
 */
declare class EventCaller {
    #private;
    readonly caller: unknown;
    readonly parent: EventCaller | null;
    readonly id: `${string}-${string}-${string}-${string}-${string}`;
    private constructor();
    get computedCallers(): unknown[];
    static create(caller: unknown, parent: EventCaller | null): EventCaller;
}
declare function getEventCaller(): EventCaller | null;
/**
 * @param caller who is calling this function, pass in `this` if it's a class method
 * @param fn
 */
declare function withEventCaller<T>(caller: unknown, fn: () => T): T;

type LLMStartEvent = {
    id: UUID;
    messages: ChatMessage[];
};
type LLMToolCallEvent = {
    toolCall: ToolCall;
};
type LLMToolResultEvent = {
    toolCall: ToolCall;
    toolResult: ToolOutput;
};
type LLMEndEvent = {
    id: UUID;
    response: ChatResponse;
};
type LLMStreamEvent = {
    id: UUID;
    chunk: ChatResponseChunk;
};
type ChunkingStartEvent = {
    text: string[];
};
type ChunkingEndEvent = {
    chunks: string[];
};
type NodeParsingStartEvent = {
    documents: TextNode[];
};
type NodeParsingEndEvent = {
    nodes: TextNode[];
};
interface LlamaIndexEventMaps {
    "llm-start": LLMStartEvent;
    "llm-end": LLMEndEvent;
    "llm-tool-call": LLMToolCallEvent;
    "llm-tool-result": LLMToolResultEvent;
    "llm-stream": LLMStreamEvent;
    "chunking-start": ChunkingStartEvent;
    "chunking-end": ChunkingEndEvent;
    "node-parsing-start": NodeParsingStartEvent;
    "node-parsing-end": NodeParsingEndEvent;
    "query-start": QueryStartEvent;
    "query-end": QueryEndEvent;
    "synthesize-start": SynthesizeStartEvent;
    "synthesize-end": SynthesizeEndEvent;
    "retrieve-start": RetrieveStartEvent;
    "retrieve-end": RetrieveEndEvent;
    "agent-start": AgentStartEvent;
    "agent-end": AgentEndEvent;
}
declare class LlamaIndexCustomEvent<T = any> extends CustomEvent<T> {
    reason: EventCaller | null;
    private constructor();
    static fromEvent<Type extends keyof LlamaIndexEventMaps>(type: Type, detail: LlamaIndexEventMaps[Type]): LlamaIndexCustomEvent<any>;
}
type EventHandler<Event> = (event: LlamaIndexCustomEvent<Event>) => void;
declare class CallbackManager {
    #private;
    on<K extends keyof LlamaIndexEventMaps>(event: K, handler: EventHandler<LlamaIndexEventMaps[K]>): this;
    off<K extends keyof LlamaIndexEventMaps>(event: K, handler: EventHandler<LlamaIndexEventMaps[K]>): this;
    dispatchEvent<K extends keyof LlamaIndexEventMaps>(event: K, detail: LlamaIndexEventMaps[K], sync?: boolean): void;
}

declare const Settings: {
    llm: LLM<object, object>;
    withLLM<Result>(llm: LLM, fn: () => Result): Result;
    embedModel: BaseEmbedding;
    withEmbedModel<Result>(embedModel: BaseEmbedding, fn: () => Result): Result;
    tokenizer: Tokenizer;
    withTokenizer<Result>(tokenizer: Tokenizer, fn: () => Result): Result;
    chunkSize: number | undefined;
    withChunkSize<Result>(chunkSize: number, fn: () => Result): Result;
    callbackManager: CallbackManager;
    withCallbackManager<Result>(callbackManager: CallbackManager, fn: () => Result): Result;
    readonly debug: boolean;
};

export { CallbackManager, DEFAULT_BASE_URL, DEFAULT_CHUNK_OVERLAP, DEFAULT_CHUNK_OVERLAP_RATIO, DEFAULT_CHUNK_SIZE, DEFAULT_COLLECTION, DEFAULT_CONTEXT_WINDOW, DEFAULT_DOC_STORE_PERSIST_FILENAME, DEFAULT_GRAPH_STORE_PERSIST_FILENAME, DEFAULT_INDEX_STORE_PERSIST_FILENAME, DEFAULT_NAMESPACE, DEFAULT_NUM_OUTPUTS, DEFAULT_PADDING, DEFAULT_PERSIST_DIR, DEFAULT_PROJECT_NAME, DEFAULT_VECTOR_STORE_PERSIST_FILENAME, EventCaller, type JSONArray, type JSONObject, type JSONValue, type LLMEndEvent, type LLMStartEvent, type LLMStreamEvent, type LLMToolCallEvent, type LLMToolResultEvent, type LlamaIndexEventMaps, Settings, type UUID, getEventCaller, withEventCaller };
