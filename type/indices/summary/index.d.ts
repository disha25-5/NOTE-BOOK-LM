import { IndexList } from "@llamaindex/core/data-structs";
import type { BaseNodePostprocessor } from "@llamaindex/core/postprocessor";
import { type ChoiceSelectPrompt } from "@llamaindex/core/prompts";
import type { QueryBundle } from "@llamaindex/core/query-engine";
import type { BaseSynthesizer } from "@llamaindex/core/response-synthesizers";
import { BaseRetriever } from "@llamaindex/core/retriever";
import type { BaseNode, Document, NodeWithScore } from "@llamaindex/core/schema";
import type { BaseDocumentStore, RefDocInfo } from "@llamaindex/core/storage/doc-store";
import type { BaseChatEngine, ContextChatEngineOptions } from "../../engines/chat/index.js";
import { RetrieverQueryEngine } from "../../engines/query/index.js";
import type { StorageContext } from "../../storage/StorageContext.js";
import type { BaseIndexInit } from "../BaseIndex.js";
import { BaseIndex } from "../BaseIndex.js";
import type { ChoiceSelectParserFunction, NodeFormatterFunction } from "./utils.js";
export declare enum SummaryRetrieverMode {
    DEFAULT = "default",
    LLM = "llm"
}
export type SummaryIndexChatEngineOptions = {
    retriever?: BaseRetriever;
    mode?: SummaryRetrieverMode;
} & Omit<ContextChatEngineOptions, "retriever">;
export interface SummaryIndexOptions {
    nodes?: BaseNode[] | undefined;
    indexStruct?: IndexList | undefined;
    indexId?: string | undefined;
    storageContext?: StorageContext | undefined;
}
/**
 * A SummaryIndex keeps nodes in a sequential order for use with summarization.
 */
export declare class SummaryIndex extends BaseIndex<IndexList> {
    constructor(init: BaseIndexInit<IndexList>);
    static init(options: SummaryIndexOptions): Promise<SummaryIndex>;
    static fromDocuments(documents: Document[], args?: {
        storageContext?: StorageContext | undefined;
    }): Promise<SummaryIndex>;
    asRetriever(options?: {
        mode: SummaryRetrieverMode;
    }): BaseRetriever;
    asQueryEngine(options?: {
        retriever?: BaseRetriever;
        responseSynthesizer?: BaseSynthesizer;
        preFilters?: unknown;
        nodePostprocessors?: BaseNodePostprocessor[];
    }): RetrieverQueryEngine;
    asChatEngine(options?: SummaryIndexChatEngineOptions): BaseChatEngine;
    static buildIndexFromNodes(nodes: BaseNode[], docStore: BaseDocumentStore, indexStruct?: IndexList): Promise<IndexList>;
    insertNodes(nodes: BaseNode[]): Promise<void>;
    deleteRefDoc(refDocId: string, deleteFromDocStore?: boolean): Promise<void>;
    deleteNodes(nodeIds: string[], deleteFromDocStore: boolean): Promise<void>;
    getRefDocInfo(): Promise<Record<string, RefDocInfo>>;
}
export type ListIndex = SummaryIndex;
export type ListRetrieverMode = SummaryRetrieverMode;
/**
 * Simple retriever for SummaryIndex that returns all nodes
 */
export declare class SummaryIndexRetriever extends BaseRetriever {
    index: SummaryIndex;
    constructor(index: SummaryIndex);
    _retrieve(queryBundle: QueryBundle): Promise<NodeWithScore[]>;
}
/**
 * LLM retriever for SummaryIndex which lets you select the most relevant chunks.
 */
export declare class SummaryIndexLLMRetriever extends BaseRetriever {
    index: SummaryIndex;
    choiceSelectPrompt: ChoiceSelectPrompt;
    choiceBatchSize: number;
    formatNodeBatchFn: NodeFormatterFunction;
    parseChoiceSelectAnswerFn: ChoiceSelectParserFunction;
    constructor(index: SummaryIndex, choiceSelectPrompt?: ChoiceSelectPrompt, choiceBatchSize?: number, formatNodeBatchFn?: NodeFormatterFunction, parseChoiceSelectAnswerFn?: ChoiceSelectParserFunction);
    _retrieve(query: QueryBundle): Promise<NodeWithScore[]>;
}
export type ListIndexRetriever = SummaryIndexRetriever;
export type ListIndexLLMRetriever = SummaryIndexLLMRetriever;
