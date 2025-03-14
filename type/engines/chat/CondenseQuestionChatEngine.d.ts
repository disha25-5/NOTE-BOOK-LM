import { BaseChatEngine, type NonStreamingChatEngineParams, type StreamingChatEngineParams } from "@llamaindex/core/chat-engine";
import type { ChatMessage, LLM } from "@llamaindex/core/llms";
import { BaseMemory } from "@llamaindex/core/memory";
import { type CondenseQuestionPrompt, type ModuleRecord } from "@llamaindex/core/prompts";
import type { BaseQueryEngine } from "@llamaindex/core/query-engine";
import type { EngineResponse } from "@llamaindex/core/schema";
/**
 * CondenseQuestionChatEngine is used in conjunction with a Index (for example VectorStoreIndex).
 * It does two steps on taking a user's chat message: first, it condenses the chat message
 * with the previous chat history into a question with more context.
 * Then, it queries the underlying Index using the new question with context and returns
 * the response.
 * CondenseQuestionChatEngine performs well when the input is primarily questions about the
 * underlying data. It performs less well when the chat messages are not questions about the
 * data, or are very referential to previous context.
 */
export declare class CondenseQuestionChatEngine extends BaseChatEngine {
    queryEngine: BaseQueryEngine;
    memory: BaseMemory;
    llm: LLM;
    condenseMessagePrompt: CondenseQuestionPrompt;
    get chatHistory(): ChatMessage<object>[] | Promise<ChatMessage<object>[]>;
    constructor(init: {
        queryEngine: BaseQueryEngine;
        chatHistory: ChatMessage[];
        condenseMessagePrompt?: CondenseQuestionPrompt;
    });
    protected _getPromptModules(): ModuleRecord;
    protected _getPrompts(): {
        condenseMessagePrompt: CondenseQuestionPrompt;
    };
    protected _updatePrompts(promptsDict: {
        condenseMessagePrompt: CondenseQuestionPrompt;
    }): void;
    private condenseQuestion;
    chat(params: NonStreamingChatEngineParams): Promise<EngineResponse>;
    chat(params: StreamingChatEngineParams): Promise<AsyncIterable<EngineResponse>>;
    reset(): void;
}
