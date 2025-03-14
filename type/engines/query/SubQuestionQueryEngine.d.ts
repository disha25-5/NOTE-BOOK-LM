import type { BaseSynthesizer } from "@llamaindex/core/response-synthesizers";
import type { BaseTool, ToolMetadata } from "@llamaindex/core/llms";
import type { PromptsRecord } from "@llamaindex/core/prompts";
import { BaseQueryEngine, type QueryType } from "@llamaindex/core/query-engine";
import type { BaseQuestionGenerator } from "./types.js";
/**
 * SubQuestionQueryEngine decomposes a question into subquestions and then
 */
export declare class SubQuestionQueryEngine extends BaseQueryEngine {
    responseSynthesizer: BaseSynthesizer;
    questionGen: BaseQuestionGenerator;
    queryEngines: BaseTool[];
    metadatas: ToolMetadata[];
    constructor(init: {
        questionGen: BaseQuestionGenerator;
        responseSynthesizer: BaseSynthesizer;
        queryEngineTools: BaseTool[];
    });
    _query(strOrQueryBundle: QueryType, stream?: boolean): Promise<import("@llamaindex/core/schema").EngineResponse | AsyncIterable<import("@llamaindex/core/schema").EngineResponse>>;
    protected _getPrompts(): PromptsRecord;
    protected _updatePrompts(): void;
    protected _getPromptModules(): Record<string, any>;
    static fromDefaults(init: {
        queryEngineTools: BaseTool[];
        questionGen?: BaseQuestionGenerator;
        responseSynthesizer?: BaseSynthesizer;
    }): SubQuestionQueryEngine;
    private querySubQ;
}
