import { Tokenizers } from '@llamaindex/env/tokenizers';
import { JSONSchemaType } from 'ajv';
import { JSONValue, JSONObject } from '../../global/dist/index.cjs';

/**
 * @internal
 */
interface LLMChat<AdditionalChatOptions extends object = object, AdditionalMessageOptions extends object = object> {
    chat(params: LLMChatParamsStreaming<AdditionalChatOptions> | LLMChatParamsNonStreaming<AdditionalChatOptions>): Promise<ChatResponse<AdditionalMessageOptions> | AsyncIterable<ChatResponseChunk<AdditionalMessageOptions>>>;
}
/**
 * Unified language model interface
 */
interface LLM<AdditionalChatOptions extends object = object, AdditionalMessageOptions extends object = object> extends LLMChat<AdditionalChatOptions> {
    metadata: LLMMetadata;
    /**
     * Get a chat response from the LLM
     */
    chat(params: LLMChatParamsStreaming<AdditionalChatOptions, AdditionalMessageOptions>): Promise<AsyncIterable<ChatResponseChunk>>;
    chat(params: LLMChatParamsNonStreaming<AdditionalChatOptions, AdditionalMessageOptions>): Promise<ChatResponse<AdditionalMessageOptions>>;
    /**
     * Get a prompt completion from the LLM
     */
    complete(params: LLMCompletionParamsStreaming): Promise<AsyncIterable<CompletionResponse>>;
    complete(params: LLMCompletionParamsNonStreaming): Promise<CompletionResponse>;
}
type MessageType = "user" | "assistant" | "system" | "memory";
type TextChatMessage<AdditionalMessageOptions extends object = object> = {
    content: string;
    role: MessageType;
    options?: undefined | AdditionalMessageOptions;
};
type ChatMessage<AdditionalMessageOptions extends object = object> = {
    content: MessageContent;
    role: MessageType;
    options?: undefined | AdditionalMessageOptions;
};
interface ChatResponse<AdditionalMessageOptions extends object = object> {
    message: ChatMessage<AdditionalMessageOptions>;
    /**
     * Raw response from the LLM
     *
     * If LLM response an iterable of chunks, this will be an array of those chunks
     */
    raw: object | null;
}
type ChatResponseChunk<AdditionalMessageOptions extends object = object> = {
    raw: object | null;
    delta: string;
    options?: undefined | AdditionalMessageOptions;
};
interface CompletionResponse {
    text: string;
    /**
     * Raw response from the LLM
     *
     * It's possible that this is `null` if the LLM response an iterable of chunks
     */
    raw: object | null;
}
type LLMMetadata = {
    model: string;
    temperature: number;
    topP: number;
    maxTokens?: number | undefined;
    contextWindow: number;
    tokenizer: Tokenizers | undefined;
};
interface LLMChatParamsBase<AdditionalChatOptions extends object = object, AdditionalMessageOptions extends object = object> {
    messages: ChatMessage<AdditionalMessageOptions>[];
    additionalChatOptions?: AdditionalChatOptions;
    tools?: BaseTool[];
}
interface LLMChatParamsStreaming<AdditionalChatOptions extends object = object, AdditionalMessageOptions extends object = object> extends LLMChatParamsBase<AdditionalChatOptions, AdditionalMessageOptions> {
    stream: true;
}
interface LLMChatParamsNonStreaming<AdditionalChatOptions extends object = object, AdditionalMessageOptions extends object = object> extends LLMChatParamsBase<AdditionalChatOptions, AdditionalMessageOptions> {
    stream?: false;
}
interface LLMCompletionParamsBase {
    prompt: MessageContent;
}
interface LLMCompletionParamsStreaming extends LLMCompletionParamsBase {
    stream: true;
}
interface LLMCompletionParamsNonStreaming extends LLMCompletionParamsBase {
    stream?: false | null | undefined;
}
type MessageContentTextDetail = {
    type: "text";
    text: string;
};
type MessageContentImageDetail = {
    type: "image_url";
    image_url: {
        url: string;
    };
};
type MessageContentDetail = MessageContentTextDetail | MessageContentImageDetail;
/**
 * Extended type for the content of a message that allows for multi-modal messages.
 */
type MessageContent = string | MessageContentDetail[];
type ToolCall = {
    name: string;
    input: JSONObject;
    id: string;
};
type PartialToolCall = {
    name: string;
    id: string;
    input: string;
};
type ToolResult = {
    id: string;
    result: string;
    isError: boolean;
};
type ToolCallOptions = {
    toolCall: (ToolCall | PartialToolCall)[];
};
type ToolResultOptions = {
    toolResult: ToolResult;
};
type ToolCallLLMMessageOptions = ToolResultOptions | ToolCallOptions | object;
type Known = {
    [key: string]: Known;
} | [Known, ...Known[]] | Known[] | number | string | boolean | null;
type ToolMetadata<Parameters extends Record<string, unknown> = Record<string, unknown>> = {
    description: string;
    name: string;
    /**
     * OpenAI uses JSON Schema to describe the parameters that a tool can take.
     * @link https://json-schema.org/understanding-json-schema
     */
    parameters?: Parameters;
    /**
     * Whether the tool requires workflow context to be passed in.
     */
    requireContext?: boolean;
};
/**
 * Simple Tool interface. Likely to change.
 */
interface BaseTool<Input = any> {
    /**
     * This could be undefined if the implementation is not provided,
     *  which might be the case when communicating with a llm.
     *
     * @return {JSONValue | Promise<JSONValue>} The output of the tool.
     */
    call?: (input: Input) => JSONValue | Promise<JSONValue>;
    metadata: Input extends Known ? ToolMetadata<JSONSchemaType<Input>> : ToolMetadata;
}
type BaseToolWithCall<Input = any> = Omit<BaseTool<Input>, "call"> & {
    call: NonNullable<Pick<BaseTool<Input>, "call">["call"]>;
};
type ToolOutput = {
    tool: BaseTool | undefined;
    input: JSONObject;
    output: JSONValue;
    isError: boolean;
};

declare abstract class BaseLLM<AdditionalChatOptions extends object = object, AdditionalMessageOptions extends object = object> implements LLM<AdditionalChatOptions> {
    abstract metadata: LLMMetadata;
    complete(params: LLMCompletionParamsStreaming): Promise<AsyncIterable<CompletionResponse>>;
    complete(params: LLMCompletionParamsNonStreaming): Promise<CompletionResponse>;
    abstract chat(params: LLMChatParamsStreaming<AdditionalChatOptions, AdditionalMessageOptions>): Promise<AsyncIterable<ChatResponseChunk>>;
    abstract chat(params: LLMChatParamsNonStreaming<AdditionalChatOptions, AdditionalMessageOptions>): Promise<ChatResponse<AdditionalMessageOptions>>;
}
declare abstract class ToolCallLLM<AdditionalChatOptions extends object = object, AdditionalMessageOptions extends ToolCallLLMMessageOptions = ToolCallLLMMessageOptions> extends BaseLLM<AdditionalChatOptions, AdditionalMessageOptions> {
    abstract supportToolCall: boolean;
}

export { BaseLLM, type BaseTool, type BaseToolWithCall, type ChatMessage, type ChatResponse, type ChatResponseChunk, type CompletionResponse, type LLM, type LLMChat, type LLMChatParamsBase, type LLMChatParamsNonStreaming, type LLMChatParamsStreaming, type LLMCompletionParamsBase, type LLMCompletionParamsNonStreaming, type LLMCompletionParamsStreaming, type LLMMetadata, type MessageContent, type MessageContentDetail, type MessageContentImageDetail, type MessageContentTextDetail, type MessageType, type PartialToolCall, type TextChatMessage, type ToolCall, ToolCallLLM, type ToolCallLLMMessageOptions, type ToolCallOptions, type ToolMetadata, type ToolOutput, type ToolResult, type ToolResultOptions };
