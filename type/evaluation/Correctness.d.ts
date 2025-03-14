import { PromptMixin } from "@llamaindex/core/prompts";
import type { CorrectnessSystemPrompt } from "./prompts.js";
import type { BaseEvaluator, EvaluationResult, EvaluatorParams, EvaluatorResponseParams } from "./types.js";
type CorrectnessParams = {
    scoreThreshold?: number;
    parserFunction?: (str: string) => [number, string];
};
/** Correctness Evaluator */
export declare class CorrectnessEvaluator extends PromptMixin implements BaseEvaluator {
    private scoreThreshold;
    private parserFunction;
    private llm;
    private correctnessPrompt;
    constructor(params?: CorrectnessParams);
    protected _getPrompts(): {
        correctnessPrompt: CorrectnessSystemPrompt;
    };
    protected _getPromptModules(): {};
    protected _updatePrompts(prompts: {
        correctnessPrompt: CorrectnessSystemPrompt;
    }): void;
    /**
     *
     * @param query Query to evaluate
     * @param response  Response to evaluate
     * @param contexts Array of contexts
     * @param reference  Reference response
     */
    evaluate({ query, response, contexts, reference, }: EvaluatorParams): Promise<EvaluationResult>;
    /**
     * @param query Query to evaluate
     * @param response  Response to evaluate
     */
    evaluateResponse({ query, response, }: EvaluatorResponseParams): Promise<EvaluationResult>;
}
export {};
