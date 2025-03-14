import { PromptMixin, type ModuleRecord } from "@llamaindex/core/prompts";
import type { FaithfulnessRefinePrompt, FaithfulnessTextQAPrompt } from "./prompts.js";
import type { BaseEvaluator, EvaluationResult, EvaluatorParams, EvaluatorResponseParams } from "./types.js";
export declare class FaithfulnessEvaluator extends PromptMixin implements BaseEvaluator {
    private raiseError;
    private evalTemplate;
    private refineTemplate;
    constructor(params?: {
        raiseError?: boolean | undefined;
        faithfulnessSystemPrompt?: FaithfulnessTextQAPrompt | undefined;
        faithFulnessRefinePrompt?: FaithfulnessRefinePrompt | undefined;
    });
    protected _getPromptModules(): ModuleRecord;
    protected _getPrompts(): {
        [x: string]: any;
    };
    protected _updatePrompts(promptsDict: {
        faithfulnessSystemPrompt: FaithfulnessTextQAPrompt;
        faithFulnessRefinePrompt: FaithfulnessRefinePrompt;
    }): void;
    /**
     * @param query Query to evaluate
     * @param response  Response to evaluate
     * @param contexts Array of contexts
     * @param reference  Reference response
     * @param sleepTimeInSeconds  Sleep time in seconds
     */
    evaluate({ query, response, contexts, reference, sleepTimeInSeconds, }: EvaluatorParams): Promise<EvaluationResult>;
    /**
     * @param query Query to evaluate
     * @param response  Response to evaluate
     */
    evaluateResponse({ query, response, }: EvaluatorResponseParams): Promise<EvaluationResult>;
}
