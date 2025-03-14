import { Tokenizer } from '@llamaindex/env/tokenizers';
import { LLMMetadata } from '../../llms/dist/index.js';
import { TextSplitter } from '../../node-parser/dist/index.js';
import { BasePromptTemplate, PromptTemplate } from '../../prompts/dist/index.js';

/**
 * Get biggest empty prompt size from a list of prompts.
 * Used to calculate the maximum size of inputs to the LLM.
 */
declare function getBiggestPrompt(prompts: PromptTemplate[]): PromptTemplate;
type PromptHelperOptions = {
    contextWindow?: number | undefined;
    numOutput?: number | undefined;
    chunkOverlapRatio?: number | undefined;
    chunkSizeLimit?: number | undefined;
    tokenizer?: Tokenizer | undefined;
    separator?: string | undefined;
};
/**
 * A collection of helper functions for working with prompts.
 */
declare class PromptHelper {
    #private;
    contextWindow: number;
    numOutput: number;
    chunkOverlapRatio: number;
    chunkSizeLimit: number | undefined;
    tokenizer: Tokenizer;
    separator: string;
    constructor(options?: PromptHelperOptions);
    /**
     * Creates a text splitter configured to maximally pack the available context window.
     */
    getTextSplitterGivenPrompt(prompt: BasePromptTemplate, numChunks?: number, padding?: number): TextSplitter;
    /**
     * Truncate text chunks to fit within the available context window.
     */
    truncate(prompt: BasePromptTemplate, textChunks: string[], padding?: number): string[];
    /**
     * Repack text chunks to better utilize the available context window.
     */
    repack(prompt: BasePromptTemplate, textChunks: string[], padding?: number): string[];
    static fromLLMMetadata(metadata: LLMMetadata, options?: {
        chunkOverlapRatio?: number;
        chunkSizeLimit?: number;
        tokenizer?: Tokenizer;
        separator?: string;
    }): PromptHelper;
}

export { PromptHelper, type PromptHelperOptions, getBiggestPrompt };
