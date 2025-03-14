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
    VectorIndexRetriever: function() {
        return VectorIndexRetriever;
    },
    VectorStoreIndex: function() {
        return VectorStoreIndex;
    }
});
const _chatengine = require("@llamaindex/core/chat-engine");
const _datastructs = require("@llamaindex/core/data-structs");
const _embeddings = require("@llamaindex/core/embeddings");
const _retriever = require("@llamaindex/core/retriever");
const _schema = require("@llamaindex/core/schema");
const _utils = require("@llamaindex/core/utils");
const _vectorstore = require("@llamaindex/core/vector-store");
const _Settings = require("../../Settings.js");
const _RetrieverQueryEngine = require("../../engines/query/RetrieverQueryEngine.js");
const _IngestionPipeline = require("../../ingestion/IngestionPipeline.js");
const _index = require("../../ingestion/strategies/index.js");
const _StorageContext = require("../../storage/StorageContext.js");
const _BaseIndex = require("../BaseIndex.js");
class VectorStoreIndex extends _BaseIndex.BaseIndex {
    indexStore;
    embedModel;
    vectorStores;
    constructor(init){
        super(init);
        this.indexStore = init.indexStore;
        this.vectorStores = init.vectorStores ?? init.storageContext.vectorStores;
        this.embedModel = _Settings.Settings.embedModel;
    }
    /**
   * The async init function creates a new VectorStoreIndex.
   * @param options
   * @returns
   */ static async init(options) {
        const storageContext = options.storageContext ?? await (0, _StorageContext.storageContextFromDefaults)({});
        const indexStore = storageContext.indexStore;
        const docStore = storageContext.docStore;
        let indexStruct = await VectorStoreIndex.setupIndexStructFromStorage(indexStore, options);
        if (!options.nodes && !indexStruct) {
            throw new Error("Cannot initialize VectorStoreIndex without nodes or indexStruct");
        }
        indexStruct = indexStruct ?? new _datastructs.IndexDict();
        const index = new this({
            storageContext,
            docStore,
            indexStruct,
            indexStore,
            vectorStores: options.vectorStores
        });
        if (options.nodes) {
            // If nodes are passed in, then we need to update the index
            await index.buildIndexFromNodes(options.nodes, {
                logProgress: options.logProgress
            });
        }
        return index;
    }
    static async setupIndexStructFromStorage(indexStore, options) {
        const indexStructs = await indexStore.getIndexStructs();
        let indexStruct;
        if (options.indexStruct && indexStructs.length > 0) {
            throw new Error("Cannot initialize index with both indexStruct and indexStore");
        }
        if (options.indexStruct) {
            indexStruct = options.indexStruct;
        } else if (indexStructs.length == 1) {
            indexStruct = indexStructs[0].type === _datastructs.IndexStructType.SIMPLE_DICT ? indexStructs[0] : undefined;
            indexStruct = indexStructs[0];
        } else if (indexStructs.length > 1 && options.indexId) {
            indexStruct = await indexStore.getIndexStruct(options.indexId);
        }
        // Check indexStruct type
        if (indexStruct && indexStruct.type !== _datastructs.IndexStructType.SIMPLE_DICT) {
            throw new Error("Attempting to initialize VectorStoreIndex with non-vector indexStruct");
        }
        return indexStruct;
    }
    /**
   * Calculates the embeddings for the given nodes.
   *
   * @param nodes - An array of BaseNode objects representing the nodes for which embeddings are to be calculated.
   * @param {Object} [options] - An optional object containing additional parameters.
   *   @param {boolean} [options.logProgress] - A boolean indicating whether to log progress to the console (useful for debugging).
   */ async getNodeEmbeddingResults(nodes, options) {
        const nodeMap = (0, _schema.splitNodesByType)(nodes);
        for(const type in nodeMap){
            const nodes = nodeMap[type];
            const embedModel = this.vectorStores[type]?.embedModel ?? this.embedModel;
            if (embedModel && nodes) {
                await embedModel(nodes, {
                    logProgress: options?.logProgress
                });
            }
        }
        return nodes;
    }
    /**
   * Get embeddings for nodes and place them into the index.
   * @param nodes
   * @returns
   */ async buildIndexFromNodes(nodes, options) {
        await this.insertNodes(nodes, options);
    }
    /**
   * High level API: split documents, get embeddings, and build index.
   * @param documents
   * @param args
   * @returns
   */ static async fromDocuments(documents, args = {}) {
        args.storageContext = args.storageContext ?? await (0, _StorageContext.storageContextFromDefaults)({});
        args.vectorStores = args.vectorStores ?? args.storageContext.vectorStores;
        args.docStoreStrategy = args.docStoreStrategy ?? // set doc store strategy defaults to the same as for the IngestionPipeline
        (args.vectorStores ? _index.DocStoreStrategy.UPSERTS : _index.DocStoreStrategy.DUPLICATES_ONLY);
        const docStore = args.storageContext.docStore;
        if (args.logProgress) {
            console.log("Using node parser on documents...");
        }
        // use doc store strategy to avoid duplicates
        const vectorStores = Object.values(args.vectorStores ?? {});
        const docStoreStrategy = (0, _index.createDocStoreStrategy)(args.docStoreStrategy, docStore, vectorStores);
        args.nodes = await (0, _IngestionPipeline.runTransformations)(documents, [
            _Settings.Settings.nodeParser
        ], {}, {
            docStoreStrategy
        });
        if (args.logProgress) {
            console.log("Finished parsing documents.");
        }
        try {
            return await this.init(args);
        } catch (error) {
            await docStoreStrategy.rollback(args.storageContext.docStore, args.nodes);
            throw error;
        }
    }
    static async fromVectorStores(vectorStores) {
        if (!vectorStores[_schema.ModalityType.TEXT]?.storesText) {
            throw new Error("Cannot initialize from a vector store that does not store text");
        }
        const storageContext = await (0, _StorageContext.storageContextFromDefaults)({
            vectorStores
        });
        const index = await this.init({
            nodes: [],
            storageContext
        });
        return index;
    }
    static async fromVectorStore(vectorStore) {
        return this.fromVectorStores({
            [_schema.ModalityType.TEXT]: vectorStore
        });
    }
    asRetriever(options) {
        return new VectorIndexRetriever({
            index: this,
            ...options
        });
    }
    /**
   * Create a RetrieverQueryEngine.
   * similarityTopK is only used if no existing retriever is provided.
   */ asQueryEngine(options) {
        const { retriever, responseSynthesizer, preFilters, nodePostprocessors, similarityTopK } = options ?? {};
        return new _RetrieverQueryEngine.RetrieverQueryEngine(retriever ?? this.asRetriever({
            similarityTopK,
            filters: preFilters
        }), responseSynthesizer, nodePostprocessors);
    }
    /**
   * Convert the index to a chat engine.
   * @param options The options for creating the chat engine
   * @returns A ContextChatEngine that uses the index's retriever to get context for each query
   */ asChatEngine(options = {}) {
        const { retriever, similarityTopK, preFilters, ...contextChatEngineOptions } = options;
        return new _chatengine.ContextChatEngine({
            retriever: retriever ?? this.asRetriever({
                similarityTopK,
                filters: preFilters
            }),
            ...contextChatEngineOptions
        });
    }
    async insertNodesToStore(newIds, nodes, vectorStore) {
        // NOTE: if the vector store doesn't store text,
        // we need to add the nodes to the index struct and document store
        // NOTE: if the vector store keeps text,
        // we only need to add image and index nodes
        for(let i = 0; i < nodes.length; ++i){
            const { type } = nodes[i];
            if (!vectorStore.storesText || type === _schema.ObjectType.INDEX || type === _schema.ObjectType.IMAGE) {
                const nodeWithoutEmbedding = nodes[i].clone();
                nodeWithoutEmbedding.embedding = undefined;
                this.indexStruct.addNode(nodeWithoutEmbedding, newIds[i]);
                await this.docStore.addDocuments([
                    nodeWithoutEmbedding
                ], true);
            }
        }
    }
    async insertNodes(nodes, options) {
        if (!nodes || nodes.length === 0) {
            return;
        }
        nodes = await this.getNodeEmbeddingResults(nodes, options);
        await (0, _IngestionPipeline.addNodesToVectorStores)(nodes, this.vectorStores, this.insertNodesToStore.bind(this));
        await this.indexStore.addIndexStruct(this.indexStruct);
    }
    async deleteRefDoc(refDocId, deleteFromDocStore = true) {
        for (const vectorStore of Object.values(this.vectorStores)){
            await this.deleteRefDocFromStore(vectorStore, refDocId);
        }
        if (deleteFromDocStore) {
            await this.docStore.deleteDocument(refDocId, false);
        }
    }
    async deleteRefDocFromStore(vectorStore, refDocId) {
        await vectorStore.delete(refDocId);
        if (!vectorStore.storesText) {
            const refDocInfo = await this.docStore.getRefDocInfo(refDocId);
            if (refDocInfo) {
                for (const nodeId of refDocInfo.nodeIds){
                    this.indexStruct.delete(nodeId);
                    await vectorStore.delete(nodeId);
                }
            }
            await this.indexStore.addIndexStruct(this.indexStruct);
        }
    }
}
class VectorIndexRetriever extends _retriever.BaseRetriever {
    index;
    topK;
    filters;
    queryMode;
    constructor(options){
        super();
        this.index = options.index;
        this.queryMode = options.mode ?? _vectorstore.VectorStoreQueryMode.DEFAULT;
        if ("topK" in options && options.topK) {
            this.topK = options.topK;
        } else {
            this.topK = {
                [_schema.ModalityType.TEXT]: "similarityTopK" in options && options.similarityTopK ? options.similarityTopK : _embeddings.DEFAULT_SIMILARITY_TOP_K,
                [_schema.ModalityType.IMAGE]: _embeddings.DEFAULT_SIMILARITY_TOP_K
            };
        }
        this.filters = options.filters;
    }
    /**
   * @deprecated, pass similarityTopK or topK in constructor instead or directly modify topK
   */ set similarityTopK(similarityTopK) {
        this.topK[_schema.ModalityType.TEXT] = similarityTopK;
    }
    async _retrieve(params) {
        const { query } = params;
        const vectorStores = this.index.vectorStores;
        let nodesWithScores = [];
        for(const type in vectorStores){
            const vectorStore = vectorStores[type];
            nodesWithScores = nodesWithScores.concat(await this.retrieveQuery(query, type, vectorStore));
        }
        return nodesWithScores;
    }
    async retrieveQuery(query, type, vectorStore, filters) {
        // convert string message to multi-modal format
        let queryStr = query;
        if (typeof query === "string") {
            queryStr = query;
            query = [
                {
                    type: "text",
                    text: queryStr
                }
            ];
        } else {
            queryStr = (0, _utils.extractText)(query);
        }
        // overwrite embed model if specified, otherwise use the one from the vector store
        const embedModel = this.index.embedModel ?? vectorStore.embedModel;
        let nodes = [];
        // query each content item (e.g. text or image) separately
        for (const item of query){
            const queryEmbedding = await embedModel.getQueryEmbedding(item);
            if (queryEmbedding) {
                const result = await vectorStore.query({
                    queryStr,
                    queryEmbedding,
                    mode: this.queryMode ?? _vectorstore.VectorStoreQueryMode.DEFAULT,
                    similarityTopK: this.topK[type],
                    filters: this.filters ?? filters ?? undefined
                });
                nodes = nodes.concat(this.buildNodeListFromQueryResult(result));
            }
        }
        return nodes;
    }
    buildNodeListFromQueryResult(result) {
        const nodesWithScores = [];
        for(let i = 0; i < result.ids.length; i++){
            const nodeFromResult = result.nodes?.[i];
            if (!this.index.indexStruct.nodesDict[result.ids[i]] && nodeFromResult) {
                this.index.indexStruct.nodesDict[result.ids[i]] = nodeFromResult;
            }
            const node = this.index.indexStruct.nodesDict[result.ids[i]];
            // XXX: Hack, if it's an image node, we reconstruct the image from the URL
            // Alternative: Store image in doc store and retrieve it here
            if (node instanceof _schema.ImageNode) {
                node.image = node.getUrl();
            }
            nodesWithScores.push({
                node: node,
                score: result.similarities[i]
            });
        }
        return nodesWithScores;
    }
}
