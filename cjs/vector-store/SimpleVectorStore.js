"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SimpleVectorStore", {
    enumerable: true,
    get: function() {
        return SimpleVectorStore;
    }
});
const _embeddings = require("@llamaindex/core/embeddings");
const _global = require("@llamaindex/core/global");
const _vectorstore = require("@llamaindex/core/vector-store");
const _env = require("@llamaindex/env");
const _FileSystem = require("../storage/FileSystem.js");
const LEARNER_MODES = new Set([
    _vectorstore.VectorStoreQueryMode.SVM,
    _vectorstore.VectorStoreQueryMode.LINEAR_REGRESSION,
    _vectorstore.VectorStoreQueryMode.LOGISTIC_REGRESSION
]);
const MMR_MODE = _vectorstore.VectorStoreQueryMode.MMR;
// Mapping of filter operators to metadata filter functions
const OPERATOR_TO_FILTER = {
    [_vectorstore.FilterOperator.EQ]: ({ key, value }, metadata)=>{
        return metadata[key] === (0, _vectorstore.parsePrimitiveValue)(value);
    },
    [_vectorstore.FilterOperator.NE]: ({ key, value }, metadata)=>{
        return metadata[key] !== (0, _vectorstore.parsePrimitiveValue)(value);
    },
    [_vectorstore.FilterOperator.IN]: ({ key, value }, metadata)=>{
        return !!(0, _vectorstore.parseArrayValue)(value).find((v)=>metadata[key] === v);
    },
    [_vectorstore.FilterOperator.NIN]: ({ key, value }, metadata)=>{
        return !(0, _vectorstore.parseArrayValue)(value).find((v)=>metadata[key] === v);
    },
    [_vectorstore.FilterOperator.ANY]: ({ key, value }, metadata)=>{
        if (!Array.isArray(metadata[key])) return false;
        return (0, _vectorstore.parseArrayValue)(value).some((v)=>metadata[key].includes(v));
    },
    [_vectorstore.FilterOperator.ALL]: ({ key, value }, metadata)=>{
        if (!Array.isArray(metadata[key])) return false;
        return (0, _vectorstore.parseArrayValue)(value).every((v)=>metadata[key].includes(v));
    },
    [_vectorstore.FilterOperator.TEXT_MATCH]: ({ key, value }, metadata)=>{
        return metadata[key].includes((0, _vectorstore.parsePrimitiveValue)(value));
    },
    [_vectorstore.FilterOperator.CONTAINS]: ({ key, value }, metadata)=>{
        if (!Array.isArray(metadata[key])) return false;
        return !!(0, _vectorstore.parseArrayValue)(metadata[key]).find((v)=>v === value);
    },
    [_vectorstore.FilterOperator.GT]: ({ key, value }, metadata)=>{
        return metadata[key] > (0, _vectorstore.parsePrimitiveValue)(value);
    },
    [_vectorstore.FilterOperator.LT]: ({ key, value }, metadata)=>{
        return metadata[key] < (0, _vectorstore.parsePrimitiveValue)(value);
    },
    [_vectorstore.FilterOperator.GTE]: ({ key, value }, metadata)=>{
        return metadata[key] >= (0, _vectorstore.parsePrimitiveValue)(value);
    },
    [_vectorstore.FilterOperator.LTE]: ({ key, value }, metadata)=>{
        return metadata[key] <= (0, _vectorstore.parsePrimitiveValue)(value);
    }
};
// Build a filter function based on the metadata and the preFilters
const buildFilterFn = (metadata, preFilters)=>{
    if (!preFilters) return true;
    if (!metadata) return false;
    const { filters, condition } = preFilters;
    const queryCondition = condition || "and"; // default to and
    const itemFilterFn = (filter)=>{
        if (filter.operator === _vectorstore.FilterOperator.IS_EMPTY) {
            // for `is_empty` operator, return true if the metadata key is not present or the value is empty
            const value = metadata[filter.key];
            return value === undefined || value === null || value === "" || Array.isArray(value) && value.length === 0;
        }
        if (metadata[filter.key] === undefined) {
            // for other operators, always return false if the metadata key is not present
            return false;
        }
        const metadataLookupFn = OPERATOR_TO_FILTER[filter.operator];
        if (!metadataLookupFn) throw new Error(`Unsupported operator: ${filter.operator}`);
        return metadataLookupFn(filter, metadata);
    };
    if (queryCondition === "and") return filters.every(itemFilterFn);
    return filters.some(itemFilterFn);
};
class SimpleVectorStoreData {
    embeddingDict = {};
    textIdToRefDocId = {};
    metadataDict = {};
}
class SimpleVectorStore extends _vectorstore.BaseVectorStore {
    storesText = false;
    data;
    persistPath;
    constructor(init){
        super(init);
        this.data = init?.data || new SimpleVectorStoreData();
    }
    static async fromPersistDir(persistDir = _global.DEFAULT_PERSIST_DIR, embedModel) {
        const persistPath = _env.path.join(persistDir, "vector_store.json");
        return await SimpleVectorStore.fromPersistPath(persistPath, embedModel);
    }
    client() {
        return null;
    }
    async get(textId) {
        return this.data.embeddingDict[textId];
    }
    async add(embeddingResults) {
        for (const node of embeddingResults){
            this.data.embeddingDict[node.id_] = node.getEmbedding();
            if (!node.sourceNode) {
                continue;
            }
            this.data.textIdToRefDocId[node.id_] = node.sourceNode?.nodeId;
            // Add metadata to the metadataDict
            const metadata = (0, _vectorstore.nodeToMetadata)(node, true, undefined, false);
            delete metadata["_node_content"];
            this.data.metadataDict[node.id_] = metadata;
        }
        if (this.persistPath) {
            await this.persist(this.persistPath);
        }
        return embeddingResults.map((result)=>result.id_);
    }
    async delete(refDocId) {
        const textIdsToDelete = Object.keys(this.data.textIdToRefDocId).filter((textId)=>this.data.textIdToRefDocId[textId] === refDocId);
        for (const textId of textIdsToDelete){
            delete this.data.embeddingDict[textId];
            delete this.data.textIdToRefDocId[textId];
            if (this.data.metadataDict) delete this.data.metadataDict[textId];
        }
        if (this.persistPath) {
            await this.persist(this.persistPath);
        }
        return Promise.resolve();
    }
    async filterNodes(query) {
        const items = Object.entries(this.data.embeddingDict);
        const queryFilterFn = (nodeId)=>{
            const metadata = this.data.metadataDict[nodeId];
            return buildFilterFn(metadata, query.filters);
        };
        const nodeFilterFn = (nodeId)=>{
            if (!query.docIds) return true;
            const availableIds = new Set(query.docIds);
            return availableIds.has(nodeId);
        };
        const queriedItems = items.filter((item)=>nodeFilterFn(item[0]) && queryFilterFn(item[0]));
        const nodeIds = queriedItems.map((item)=>item[0]);
        const embeddings = queriedItems.map((item)=>item[1]);
        return {
            nodeIds,
            embeddings
        };
    }
    async query(query) {
        const { nodeIds, embeddings } = await this.filterNodes(query);
        const queryEmbedding = query.queryEmbedding;
        let topSimilarities, topIds;
        if (LEARNER_MODES.has(query.mode)) {
            // fixme: unfinished
            throw new Error("Learner modes not implemented for SimpleVectorStore yet.");
        } else if (query.mode === MMR_MODE) {
            const mmrThreshold = query.mmrThreshold;
            [topSimilarities, topIds] = (0, _embeddings.getTopKMMREmbeddings)(queryEmbedding, embeddings, null, query.similarityTopK, nodeIds, mmrThreshold);
        } else if (query.mode === _vectorstore.VectorStoreQueryMode.DEFAULT) {
            [topSimilarities, topIds] = (0, _embeddings.getTopKEmbeddings)(queryEmbedding, embeddings, query.similarityTopK, nodeIds);
        } else {
            throw new Error(`Invalid query mode: ${query.mode}`);
        }
        return Promise.resolve({
            similarities: topSimilarities,
            ids: topIds
        });
    }
    async persist(persistPath = _env.path.join(_global.DEFAULT_PERSIST_DIR, "vector_store.json")) {
        await SimpleVectorStore.persistData(persistPath, this.data);
    }
    static async persistData(persistPath, data) {
        const dirPath = _env.path.dirname(persistPath);
        if (!await (0, _FileSystem.exists)(dirPath)) {
            await _env.fs.mkdir(dirPath);
        }
        await _env.fs.writeFile(persistPath, JSON.stringify(data));
    }
    static async fromPersistPath(persistPath, embeddingModel) {
        const dirPath = _env.path.dirname(persistPath);
        if (!await (0, _FileSystem.exists)(dirPath)) {
            await _env.fs.mkdir(dirPath, {
                recursive: true
            });
        }
        let dataDict = {};
        try {
            const fileData = await _env.fs.readFile(persistPath);
            dataDict = JSON.parse(fileData.toString());
        } catch (e) {
            console.error(`No valid data found at path: ${persistPath} starting new store.`);
            // persist empty data, to ignore this error in the future
            await SimpleVectorStore.persistData(persistPath, new SimpleVectorStoreData());
        }
        const data = new SimpleVectorStoreData();
        // @ts-expect-error TS2322
        data.embeddingDict = dataDict.embeddingDict ?? {};
        // @ts-expect-error TS2322
        data.textIdToRefDocId = dataDict.textIdToRefDocId ?? {};
        // @ts-expect-error TS2322
        data.metadataDict = dataDict.metadataDict ?? {};
        const store = new SimpleVectorStore({
            data,
            embeddingModel
        });
        store.persistPath = persistPath;
        return store;
    }
    static fromDict(saveDict, embeddingModel) {
        const data = new SimpleVectorStoreData();
        data.embeddingDict = saveDict.embeddingDict;
        data.textIdToRefDocId = saveDict.textIdToRefDocId;
        data.metadataDict = saveDict.metadataDict;
        return new SimpleVectorStore({
            data,
            embeddingModel
        });
    }
    toDict() {
        return {
            embeddingDict: this.data.embeddingDict,
            textIdToRefDocId: this.data.textIdToRefDocId,
            metadataDict: this.data.metadataDict
        };
    }
}
