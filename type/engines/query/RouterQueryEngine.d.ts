import { BaseQueryEngine, type QueryType } from "@llamaindex/core/query-engine";
import { BaseSynthesizer } from "@llamaindex/core/response-synthesizers";
import { EngineResponse } from "@llamaindex/core/schema";
import type { BaseSelector } from "../../selectors/index.js";
type RouterQueryEngineTool = {
    queryEngine: BaseQueryEngine;
    description: string;
};
/**
 * A query engine that uses multiple query engines and selects the best one.
 */
export declare class RouterQueryEngine extends BaseQueryEngine {
    private selector;
    private queryEngines;
    private metadatas;
    private summarizer;
    private verbose;
    constructor(init: {
        selector: BaseSelector;
        queryEngineTools: RouterQueryEngineTool[];
        summarizer?: BaseSynthesizer | undefined;
        verbose?: boolean | undefined;
    });
    _query(strOrQueryBundle: QueryType, stream?: boolean): Promise<EngineResponse>;
    protected _getPrompts(): {};
    protected _updatePrompts(): void;
    protected _getPromptModules(): {
        selector: BaseSelector;
        summarizer: BaseSynthesizer;
    };
    static fromDefaults(init: {
        queryEngineTools: RouterQueryEngineTool[];
        selector?: BaseSelector;
        summarizer?: BaseSynthesizer;
        verbose?: boolean;
    }): RouterQueryEngine;
    private queryRoute;
}
export {};
