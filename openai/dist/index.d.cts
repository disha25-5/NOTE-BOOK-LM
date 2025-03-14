import { LLMAgentParams, LLMAgentWorker, LLMAgent } from '@llamaindex/core/agent';
import { ToolCallLLM, LLMMetadata, MessageType, ChatMessage, ToolCallLLMMessageOptions, LLMChatParamsStreaming, ChatResponseChunk, LLMChatParamsNonStreaming, ChatResponse, BaseTool } from '@llamaindex/core/llms';
import { OpenAI as OpenAI$1, ClientOptions, AzureOpenAI, AzureClientOptions } from 'openai';
import { ChatModel } from 'openai/resources/chat/chat';
import { ChatCompletionRole, ChatCompletionTool } from 'openai/resources/chat/completions';
import { ChatCompletionMessageParam } from 'openai/resources/index.js';
import { BaseEmbedding } from '@llamaindex/core/embeddings';
import { Tokenizers } from '@llamaindex/env/tokenizers';

declare const GPT4_MODELS: {
    "chatgpt-4o-latest": {
        contextWindow: number;
    };
    "gpt-4.5-preview": {
        contextWindow: number;
    };
    "gpt-4.5-preview-2025-02-27": {
        contextWindow: number;
    };
    "gpt-4": {
        contextWindow: number;
    };
    "gpt-4-32k": {
        contextWindow: number;
    };
    "gpt-4-32k-0613": {
        contextWindow: number;
    };
    "gpt-4-turbo": {
        contextWindow: number;
    };
    "gpt-4-turbo-preview": {
        contextWindow: number;
    };
    "gpt-4-1106-preview": {
        contextWindow: number;
    };
    "gpt-4-0125-preview": {
        contextWindow: number;
    };
    "gpt-4-vision-preview": {
        contextWindow: number;
    };
    "gpt-4o": {
        contextWindow: number;
    };
    "gpt-4o-2024-05-13": {
        contextWindow: number;
    };
    "gpt-4o-mini": {
        contextWindow: number;
    };
    "gpt-4o-mini-2024-07-18": {
        contextWindow: number;
    };
    "gpt-4o-2024-08-06": {
        contextWindow: number;
    };
    "gpt-4o-2024-09-14": {
        contextWindow: number;
    };
    "gpt-4o-2024-10-14": {
        contextWindow: number;
    };
    "gpt-4-0613": {
        contextWindow: number;
    };
    "gpt-4-turbo-2024-04-09": {
        contextWindow: number;
    };
    "gpt-4-0314": {
        contextWindow: number;
    };
    "gpt-4-32k-0314": {
        contextWindow: number;
    };
    "gpt-4o-realtime-preview": {
        contextWindow: number;
    };
    "gpt-4o-realtime-preview-2024-10-01": {
        contextWindow: number;
    };
    "gpt-4o-audio-preview": {
        contextWindow: number;
    };
    "gpt-4o-audio-preview-2024-10-01": {
        contextWindow: number;
    };
    "gpt-4o-2024-11-20": {
        contextWindow: number;
    };
    "gpt-4o-audio-preview-2024-12-17": {
        contextWindow: number;
    };
    "gpt-4o-mini-audio-preview": {
        contextWindow: number;
    };
    "gpt-4o-mini-audio-preview-2024-12-17": {
        contextWindow: number;
    };
};
declare const GPT35_MODELS: {
    "gpt-3.5-turbo": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-0613": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-16k": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-16k-0613": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-1106": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-0125": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-0301": {
        contextWindow: number;
    };
};
declare const O1_MODELS: {
    "o1-preview": {
        contextWindow: number;
    };
    "o1-preview-2024-09-12": {
        contextWindow: number;
    };
    "o1-mini": {
        contextWindow: number;
    };
    "o1-mini-2024-09-12": {
        contextWindow: number;
    };
    o1: {
        contextWindow: number;
    };
    "o1-2024-12-17": {
        contextWindow: number;
    };
};
declare const O3_MODELS: {
    "o3-mini": {
        contextWindow: number;
    };
    "o3-mini-2025-01-31": {
        contextWindow: number;
    };
};
/**
 * We currently support GPT-3.5 and GPT-4 models
 */
declare const ALL_AVAILABLE_OPENAI_MODELS: {
    "o3-mini": {
        contextWindow: number;
    };
    "o3-mini-2025-01-31": {
        contextWindow: number;
    };
    "o1-preview": {
        contextWindow: number;
    };
    "o1-preview-2024-09-12": {
        contextWindow: number;
    };
    "o1-mini": {
        contextWindow: number;
    };
    "o1-mini-2024-09-12": {
        contextWindow: number;
    };
    o1: {
        contextWindow: number;
    };
    "o1-2024-12-17": {
        contextWindow: number;
    };
    "gpt-3.5-turbo": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-0613": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-16k": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-16k-0613": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-1106": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-0125": {
        contextWindow: number;
    };
    "gpt-3.5-turbo-0301": {
        contextWindow: number;
    };
    "chatgpt-4o-latest": {
        contextWindow: number;
    };
    "gpt-4.5-preview": {
        contextWindow: number;
    };
    "gpt-4.5-preview-2025-02-27": {
        contextWindow: number;
    };
    "gpt-4": {
        contextWindow: number;
    };
    "gpt-4-32k": {
        contextWindow: number;
    };
    "gpt-4-32k-0613": {
        contextWindow: number;
    };
    "gpt-4-turbo": {
        contextWindow: number;
    };
    "gpt-4-turbo-preview": {
        contextWindow: number;
    };
    "gpt-4-1106-preview": {
        contextWindow: number;
    };
    "gpt-4-0125-preview": {
        contextWindow: number;
    };
    "gpt-4-vision-preview": {
        contextWindow: number;
    };
    "gpt-4o": {
        contextWindow: number;
    };
    "gpt-4o-2024-05-13": {
        contextWindow: number;
    };
    "gpt-4o-mini": {
        contextWindow: number;
    };
    "gpt-4o-mini-2024-07-18": {
        contextWindow: number;
    };
    "gpt-4o-2024-08-06": {
        contextWindow: number;
    };
    "gpt-4o-2024-09-14": {
        contextWindow: number;
    };
    "gpt-4o-2024-10-14": {
        contextWindow: number;
    };
    "gpt-4-0613": {
        contextWindow: number;
    };
    "gpt-4-turbo-2024-04-09": {
        contextWindow: number;
    };
    "gpt-4-0314": {
        contextWindow: number;
    };
    "gpt-4-32k-0314": {
        contextWindow: number;
    };
    "gpt-4o-realtime-preview": {
        contextWindow: number;
    };
    "gpt-4o-realtime-preview-2024-10-01": {
        contextWindow: number;
    };
    "gpt-4o-audio-preview": {
        contextWindow: number;
    };
    "gpt-4o-audio-preview-2024-10-01": {
        contextWindow: number;
    };
    "gpt-4o-2024-11-20": {
        contextWindow: number;
    };
    "gpt-4o-audio-preview-2024-12-17": {
        contextWindow: number;
    };
    "gpt-4o-mini-audio-preview": {
        contextWindow: number;
    };
    "gpt-4o-mini-audio-preview-2024-12-17": {
        contextWindow: number;
    };
};
type OpenAIAdditionalMetadata = object;
type OpenAIAdditionalChatOptions = Omit<Partial<OpenAI$1.Chat.ChatCompletionCreateParams>, "max_tokens" | "messages" | "model" | "temperature" | "reasoning_effort" | "top_p" | "stream" | "tools" | "toolChoice">;
type LLMInstance$1 = Pick<AzureOpenAI | OpenAI$1, "chat" | "apiKey" | "baseURL">;
declare class OpenAI extends ToolCallLLM<OpenAIAdditionalChatOptions> {
    #private;
    model: ChatModel | (string & {});
    temperature: number;
    reasoningEffort?: "low" | "medium" | "high" | undefined;
    topP: number;
    maxTokens?: number | undefined;
    additionalChatOptions?: OpenAIAdditionalChatOptions | undefined;
    apiKey?: string | undefined;
    baseURL?: string | undefined;
    maxRetries: number;
    timeout?: number;
    additionalSessionOptions?: undefined | Omit<Partial<ClientOptions>, "apiKey" | "maxRetries" | "timeout">;
    lazySession: () => Promise<LLMInstance$1>;
    get session(): Promise<LLMInstance$1>;
    constructor(init?: Omit<Partial<OpenAI>, "session"> & {
        session?: LLMInstance$1 | undefined;
        azure?: AzureClientOptions;
    });
    get supportToolCall(): boolean;
    get metadata(): LLMMetadata & OpenAIAdditionalMetadata;
    static toOpenAIRole(messageType: MessageType): ChatCompletionRole;
    static toOpenAIMessage(messages: ChatMessage<ToolCallLLMMessageOptions>[]): ChatCompletionMessageParam[];
    chat(params: LLMChatParamsStreaming<OpenAIAdditionalChatOptions, ToolCallLLMMessageOptions>): Promise<AsyncIterable<ChatResponseChunk<ToolCallLLMMessageOptions>>>;
    chat(params: LLMChatParamsNonStreaming<OpenAIAdditionalChatOptions, ToolCallLLMMessageOptions>): Promise<ChatResponse<ToolCallLLMMessageOptions>>;
    protected streamChat(baseRequestParams: OpenAI$1.Chat.ChatCompletionCreateParams): AsyncIterable<ChatResponseChunk<ToolCallLLMMessageOptions>>;
    static toTool(tool: BaseTool): ChatCompletionTool;
}
/**
 * Convenience function to create a new OpenAI instance.
 * @param init - Optional initialization parameters for the OpenAI instance.
 * @returns A new OpenAI instance.
 */
declare const openai: (init?: ConstructorParameters<typeof OpenAI>[0]) => OpenAI;

type OpenAIAgentParams = LLMAgentParams<OpenAI, ToolCallLLMMessageOptions, OpenAIAdditionalChatOptions>;
declare class OpenAIAgentWorker extends LLMAgentWorker {
}
declare class OpenAIAgent extends LLMAgent {
    constructor(params: OpenAIAgentParams);
}

declare const ALL_OPENAI_EMBEDDING_MODELS: {
    "text-embedding-ada-002": {
        dimensions: number;
        maxTokens: number;
        tokenizer: Tokenizers;
    };
    "text-embedding-3-small": {
        dimensions: number;
        dimensionOptions: number[];
        maxTokens: number;
        tokenizer: Tokenizers;
    };
    "text-embedding-3-large": {
        dimensions: number;
        dimensionOptions: number[];
        maxTokens: number;
        tokenizer: Tokenizers;
    };
};
type LLMInstance = Pick<AzureOpenAI | OpenAI$1, "embeddings" | "apiKey" | "baseURL">;
declare class OpenAIEmbedding extends BaseEmbedding {
    #private;
    /** embeddding model. defaults to "text-embedding-ada-002" */
    model: string;
    /** number of dimensions of the resulting vector, for models that support choosing fewer dimensions. undefined will default to model default */
    dimensions?: number | undefined;
    /** api key */
    apiKey?: string | undefined;
    /** base url */
    baseURL?: string | undefined;
    /** maximum number of retries, default 10 */
    maxRetries: number;
    /** timeout in ms, default 60 seconds  */
    timeout?: number | undefined;
    /** other session options for OpenAI */
    additionalSessionOptions?: Omit<Partial<ClientOptions>, "apiKey" | "maxRetries" | "timeout"> | undefined;
    lazySession: () => Promise<LLMInstance>;
    get session(): Promise<LLMInstance>;
    /**
     * OpenAI Embedding
     * @param init - initial parameters
     */
    constructor(init?: Omit<Partial<OpenAIEmbedding>, "lazySession"> & {
        session?: LLMInstance | undefined;
        azure?: AzureClientOptions;
    });
    /**
     * Get embeddings for a batch of texts
     * @param texts
     * @param options
     */
    private getOpenAIEmbedding;
    /**
     * Get embeddings for a batch of texts
     * @param texts
     */
    getTextEmbeddings: (texts: string[]) => Promise<number[][]>;
    /**
     * Get embeddings for a single text
     * @param text
     */
    getTextEmbedding(text: string): Promise<number[]>;
}

export { ALL_AVAILABLE_OPENAI_MODELS, ALL_OPENAI_EMBEDDING_MODELS, GPT35_MODELS, GPT4_MODELS, O1_MODELS, O3_MODELS, OpenAI, type OpenAIAdditionalChatOptions, type OpenAIAdditionalMetadata, OpenAIAgent, type OpenAIAgentParams, OpenAIAgentWorker, OpenAIEmbedding, openai };
