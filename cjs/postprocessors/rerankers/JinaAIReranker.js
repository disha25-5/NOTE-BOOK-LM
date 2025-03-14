"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "JinaAIReranker", {
    enumerable: true,
    get: function() {
        return JinaAIReranker;
    }
});
const _schema = require("@llamaindex/core/schema");
const _utils = require("@llamaindex/core/utils");
const _env = require("@llamaindex/env");
class JinaAIReranker {
    model = "jina-reranker-v1-base-en";
    topN;
    apiKey = undefined;
    constructor(init){
        this.topN = init?.topN ?? 2;
        this.model = init?.model ?? "jina-reranker-v1-base-en";
        this.apiKey = (0, _env.getEnv)("JINAAI_API_KEY");
        if (!this.apiKey) {
            throw new Error("Set Jina AI API Key in JINAAI_API_KEY env variable. Get one for free or top up your key at https://jina.ai/reranker");
        }
    }
    async rerank(query, documents, topN = this.topN) {
        const url = "https://api.jina.ai/v1/rerank";
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`
        };
        const data = {
            model: this.model,
            query: query,
            documents: documents,
            top_n: topN
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            });
            const jsonData = await response.json();
            return jsonData.results;
        } catch (error) {
            console.error("Error while reranking:", error);
            throw new Error("Failed to rerank documents due to an API error");
        }
    }
    async postprocessNodes(nodes, query) {
        if (nodes.length === 0) {
            return [];
        }
        if (query === undefined) {
            throw new Error("JinaAIReranker requires a query");
        }
        const documents = nodes.map((n)=>n.node.getContent(_schema.MetadataMode.ALL));
        const results = await this.rerank((0, _utils.extractText)(query), documents, this.topN);
        const newNodes = [];
        for (const result of results){
            const node = nodes[result.index];
            newNodes.push({
                node: node.node,
                score: result.relevance_score
            });
        }
        return newNodes;
    }
}
