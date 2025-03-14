import * as ___llms from '../../llms/dist/index.cjs';
import { MessageContent, ChatMessage, LLM, MessageType } from '../../llms/dist/index.cjs';
import { BaseMemory } from '../../memory/dist/index.cjs';
import { EngineResponse, NodeWithScore, MetadataMode } from '../../schema/dist/index.cjs';
import { BaseNodePostprocessor } from '../../postprocessor/dist/index.cjs';
import { PromptMixin, ContextSystemPrompt, PromptsRecord, ModuleRecord } from '../../prompts/dist/index.cjs';
import { BaseRetriever } from '../../retriever/dist/index.cjs';

interface BaseChatEngineParams<AdditionalMessageOptions extends object = object> {
    message: MessageContent;
    /**
     * Optional chat history if you want to customize the chat history.
     */
    chatHistory?: ChatMessage<AdditionalMessageOptions>[] | BaseMemory<AdditionalMessageOptions>;
}
interface StreamingChatEngineParams<AdditionalMessageOptions extends object = object, AdditionalChatOptions extends object = object> extends BaseChatEngineParams<AdditionalMessageOptions> {
    stream: true;
    chatOptions?: AdditionalChatOptions;
}
interface NonStreamingChatEngineParams<AdditionalMessageOptions extends object = object, AdditionalChatOptions extends object = object> extends BaseChatEngineParams<AdditionalMessageOptions> {
    stream?: false;
    chatOptions?: AdditionalChatOptions;
}
declare abstract class BaseChatEngine {
    abstract chat(params: NonStreamingChatEngineParams): Promise<EngineResponse>;
    abstract chat(params: StreamingChatEngineParams): Promise<AsyncIterable<EngineResponse>>;
    abstract chatHistory: ChatMessage[] | Promise<ChatMessage[]>;
}

interface Context {
    message: ChatMessage;
    nodes: NodeWithScore[];
}
/**
 * A ContextGenerator is used to generate a context based on a message's text content
 */
interface ContextGenerator {
    generate(message: string): Promise<Context>;
}

type ContextChatEngineOptions = {
    retriever: BaseRetriever;
    chatModel?: LLM | undefined;
    chatHistory?: ChatMessage[] | undefined;
    contextSystemPrompt?: ContextSystemPrompt | undefined;
    nodePostprocessors?: BaseNodePostprocessor[] | undefined;
    systemPrompt?: string | undefined;
    contextRole?: MessageType | undefined;
};
/**
 * ContextChatEngine uses the Index to get the appropriate context for each query.
 * The context is stored in the system prompt, and the chat history is chunk,
 * allowing the appropriate context to be surfaced for each query.
 */
declare class ContextChatEngine extends PromptMixin implements BaseChatEngine {
    chatModel: LLM;
    memory: BaseMemory;
    contextGenerator: ContextGenerator & PromptMixin;
    systemPrompt?: string | undefined;
    get chatHistory(): ChatMessage<object>[] | Promise<ChatMessage<object>[]>;
    constructor(init: ContextChatEngineOptions);
    protected _getPrompts(): PromptsRecord;
    protected _updatePrompts(prompts: {
        contextSystemPrompt: ContextSystemPrompt;
    }): void;
    protected _getPromptModules(): ModuleRecord;
    chat(params: NonStreamingChatEngineParams): Promise<EngineResponse>;
    chat(params: StreamingChatEngineParams): Promise<AsyncIterable<EngineResponse>>;
    reset(): void;
    private prepareRequestMessages;
    private prependSystemPrompt;
}

declare class DefaultContextGenerator extends PromptMixin implements ContextGenerator {
    retriever: BaseRetriever;
    contextSystemPrompt: ContextSystemPrompt;
    nodePostprocessors: BaseNodePostprocessor[];
    contextRole: MessageType;
    metadataMode?: MetadataMode;
    constructor(init: {
        retriever: BaseRetriever;
        contextSystemPrompt?: ContextSystemPrompt | undefined;
        nodePostprocessors?: BaseNodePostprocessor[] | undefined;
        contextRole?: MessageType | undefined;
        metadataMode?: MetadataMode | undefined;
    });
    protected _getPromptModules(): ModuleRecord;
    protected _getPrompts(): {
        contextSystemPrompt: ContextSystemPrompt;
    };
    protected _updatePrompts(promptsDict: {
        contextSystemPrompt: ContextSystemPrompt;
    }): void;
    private applyNodePostprocessors;
    generate(message: MessageContent): Promise<Context>;
}

/**
 * SimpleChatEngine is the simplest possible chat engine. Useful for using your own custom prompts.
 */
declare class SimpleChatEngine implements BaseChatEngine {
    memory: BaseMemory;
    llm: LLM;
    get chatHistory(): ___llms.ChatMessage<object>[] | Promise<___llms.ChatMessage<object>[]>;
    constructor(init?: Partial<SimpleChatEngine>);
    chat(params: NonStreamingChatEngineParams): Promise<EngineResponse>;
    chat(params: StreamingChatEngineParams): Promise<AsyncIterable<EngineResponse>>;
    reset(): void;
}

export { BaseChatEngine, type BaseChatEngineParams, ContextChatEngine, type ContextChatEngineOptions, DefaultContextGenerator, type NonStreamingChatEngineParams, SimpleChatEngine, type StreamingChatEngineParams };
