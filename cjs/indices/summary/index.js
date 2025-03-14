"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    SummaryIndex: function() {
        return SummaryIndex;
    },
    SummaryIndexLLMRetriever: function() {
        return SummaryIndexLLMRetriever;
    },
    SummaryIndexRetriever: function() {
        return SummaryIndexRetriever;
    },
    SummaryRetrieverMode: function() {
        return SummaryRetrieverMode;
    }
});
const _datastructs = require("@llamaindex/core/data-structs");
const _prompts = require("@llamaindex/core/prompts");
const _responsesynthesizers = require("@llamaindex/core/response-synthesizers");
const _retriever = require("@llamaindex/core/retriever");
const _utils = require("@llamaindex/core/utils");
const _lodash = /*#__PURE__*/ _interop_require_default(require("lodash"));
const _Settings = require("../../Settings.js");
const _index = require("../../engines/chat/index.js");
const _index1 = require("../../engines/query/index.js");
const _StorageContext = require("../../storage/StorageContext.js");
const _BaseIndex = require("../BaseIndex.js");
const _utils1 = require("./utils.js");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var SummaryRetrieverMode = /*#__PURE__*/ function(SummaryRetrieverMode) {
    SummaryRetrieverMode["DEFAULT"] = "default";
    // EMBEDDING = "embedding",
    SummaryRetrieverMode["LLM"] = "llm";
    return SummaryRetrieverMode;
}({});
class SummaryIndex extends _BaseIndex.BaseIndex {
    constructor(init){
        super(init);
    }
    static async init(options) {
        const storageContext = options.storageContext ?? await (0, _StorageContext.storageContextFromDefaults)({});
        const { docStore, indexStore } = storageContext;
        // Setup IndexStruct from storage
        const indexStructs = await indexStore.getIndexStructs();
        let indexStruct;
        if (options.indexStruct && indexStructs.length > 0) {
            throw new Error("Cannot initialize index with both indexStruct and indexStore");
        }
        if (options.indexStruct) {
            indexStruct = options.indexStruct;
        } else if (indexStructs.length == 1) {
            indexStruct = indexStructs[0].type === _datastructs.IndexStructType.LIST ? indexStructs[0] : null;
        } else if (indexStructs.length > 1 && options.indexId) {
            indexStruct = await indexStore.getIndexStruct(options.indexId);
        } else {
            indexStruct = null;
        }
        // check indexStruct type
        if (indexStruct && indexStruct.type !== _datastructs.IndexStructType.LIST) {
            throw new Error("Attempting to initialize SummaryIndex with non-list indexStruct");
        }
        if (indexStruct) {
            if (options.nodes) {
                throw new Error("Cannot initialize SummaryIndex with both nodes and indexStruct");
            }
        } else {
            if (!options.nodes) {
                throw new Error("Cannot initialize SummaryIndex without nodes or indexStruct");
            }
            indexStruct = await SummaryIndex.buildIndexFromNodes(options.nodes, storageContext.docStore);
            await indexStore.addIndexStruct(indexStruct);
        }
        return new SummaryIndex({
            storageContext,
            docStore,
            indexStore,
            indexStruct
        });
    }
    static async fromDocuments(documents, args = {}) {
        let { storageContext } = args;
        storageContext = storageContext ?? await (0, _StorageContext.storageContextFromDefaults)({});
        const docStore = storageContext.docStore;
        await docStore.addDocuments(documents, true);
        for (const doc of documents){
            await docStore.setDocumentHash(doc.id_, doc.hash);
        }
        const nodes = await _Settings.Settings.nodeParser.getNodesFromDocuments(documents);
        const index = await SummaryIndex.init({
            nodes,
            storageContext
        });
        return index;
    }
    asRetriever(options) {
        const { mode = "default" } = options ?? {};
        switch(mode){
            case "default":
                return new SummaryIndexRetriever(this);
            case "llm":
                return new SummaryIndexLLMRetriever(this);
            default:
                throw new Error(`Unknown retriever mode: ${mode}`);
        }
    }
    asQueryEngine(options) {
        let { retriever, responseSynthesizer } = options ?? {};
        if (!retriever) {
            retriever = this.asRetriever();
        }
        if (!responseSynthesizer) {
            responseSynthesizer = (0, _responsesynthesizers.getResponseSynthesizer)("compact");
        }
        return new _index1.RetrieverQueryEngine(retriever, responseSynthesizer, options?.nodePostprocessors);
    }
    asChatEngine(options) {
        const { retriever, mode, ...contextChatEngineOptions } = options ?? {};
        return new _index.ContextChatEngine({
            retriever: retriever ?? this.asRetriever({
                mode: mode ?? "default"
            }),
            ...contextChatEngineOptions
        });
    }
    static async buildIndexFromNodes(nodes, docStore, indexStruct) {
        indexStruct = indexStruct || new _datastructs.IndexList();
        await docStore.addDocuments(nodes, true);
        for (const node of nodes){
            indexStruct.addNode(node);
        }
        return indexStruct;
    }
    async insertNodes(nodes) {
        for (const node of nodes){
            this.indexStruct.addNode(node);
        }
    }
    async deleteRefDoc(refDocId, deleteFromDocStore) {
        const refDocInfo = await this.docStore.getRefDocInfo(refDocId);
        if (!refDocInfo) {
            return;
        }
        await this.deleteNodes(refDocInfo.nodeIds, false);
        if (deleteFromDocStore) {
            await this.docStore.deleteRefDoc(refDocId, false);
        }
        return;
    }
    async deleteNodes(nodeIds, deleteFromDocStore) {
        this.indexStruct.nodes = this.indexStruct.nodes.filter((existingNodeId)=>!nodeIds.includes(existingNodeId));
        if (deleteFromDocStore) {
            for (const nodeId of nodeIds){
                await this.docStore.deleteDocument(nodeId, false);
            }
        }
        await this.storageContext.indexStore.addIndexStruct(this.indexStruct);
    }
    async getRefDocInfo() {
        const nodeDocIds = this.indexStruct.nodes;
        const nodes = await this.docStore.getNodes(nodeDocIds);
        const refDocInfoMap = {};
        for (const node of nodes){
            const refNode = node.sourceNode;
            if (_lodash.default.isNil(refNode)) {
                continue;
            }
            const refDocInfo = await this.docStore.getRefDocInfo(refNode.nodeId);
            if (_lodash.default.isNil(refDocInfo)) {
                continue;
            }
            refDocInfoMap[refNode.nodeId] = refDocInfo;
        }
        return refDocInfoMap;
    }
}
class SummaryIndexRetriever extends _retriever.BaseRetriever {
    index;
    constructor(index){
        super();
        this.index = index;
    }
    async _retrieve(queryBundle) {
        const nodeIds = this.index.indexStruct.nodes;
        const nodes = await this.index.docStore.getNodes(nodeIds);
        return nodes.map((node)=>({
                node: node,
                score: 1
            }));
    }
}
class SummaryIndexLLMRetriever extends _retriever.BaseRetriever {
    index;
    choiceSelectPrompt;
    choiceBatchSize;
    formatNodeBatchFn;
    parseChoiceSelectAnswerFn;
    constructor(index, choiceSelectPrompt, choiceBatchSize = 10, formatNodeBatchFn, parseChoiceSelectAnswerFn){
        super();
        this.index = index;
        this.choiceSelectPrompt = choiceSelectPrompt || _prompts.defaultChoiceSelectPrompt;
        this.choiceBatchSize = choiceBatchSize;
        this.formatNodeBatchFn = formatNodeBatchFn || _utils1.defaultFormatNodeBatchFn;
        this.parseChoiceSelectAnswerFn = parseChoiceSelectAnswerFn || _utils1.defaultParseChoiceSelectAnswerFn;
    }
    async _retrieve(query) {
        const nodeIds = this.index.indexStruct.nodes;
        const results = [];
        for(let idx = 0; idx < nodeIds.length; idx += this.choiceBatchSize){
            const nodeIdsBatch = nodeIds.slice(idx, idx + this.choiceBatchSize);
            const nodesBatch = await this.index.docStore.getNodes(nodeIdsBatch);
            const fmtBatchStr = this.formatNodeBatchFn(nodesBatch);
            const input = {
                context: fmtBatchStr,
                query: (0, _utils.extractText)(query)
            };
            const llm = _Settings.Settings.llm;
            const rawResponse = (await llm.complete({
                prompt: this.choiceSelectPrompt.format(input)
            })).text;
            // parseResult is a map from doc number to relevance score
            const parseResult = this.parseChoiceSelectAnswerFn(rawResponse, nodesBatch.length);
            const choiceNodeIds = nodeIdsBatch.filter((nodeId, idx)=>{
                return `${idx}` in parseResult;
            });
            const choiceNodes = await this.index.docStore.getNodes(choiceNodeIds);
            const nodeWithScores = choiceNodes.map((node, i)=>({
                    node: node,
                    score: _lodash.default.get(parseResult, `${i + 1}`, 1)
                }));
            results.push(...nodeWithScores);
        }
        return results;
    }
}
