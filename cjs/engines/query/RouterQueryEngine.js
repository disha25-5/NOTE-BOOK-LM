"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouterQueryEngine", {
    enumerable: true,
    get: function() {
        return RouterQueryEngine;
    }
});
const _queryengine = require("@llamaindex/core/query-engine");
const _responsesynthesizers = require("@llamaindex/core/response-synthesizers");
const _utils = require("@llamaindex/core/utils");
const _index = require("../../selectors/index.js");
const _Settings = require("../../Settings.js");
async function combineResponses(summarizer, responses, queryBundle, verbose = false) {
    if (verbose) {
        console.log("Combining responses from multiple query engines.");
    }
    const sourceNodes = [];
    for (const response of responses){
        if (response?.sourceNodes) {
            sourceNodes.push(...response.sourceNodes);
        }
    }
    return await summarizer.synthesize({
        query: queryBundle,
        nodes: sourceNodes
    });
}
class RouterQueryEngine extends _queryengine.BaseQueryEngine {
    selector;
    queryEngines;
    metadatas;
    summarizer;
    verbose;
    constructor(init){
        super();
        this.selector = init.selector;
        this.queryEngines = init.queryEngineTools.map((tool)=>tool.queryEngine);
        this.metadatas = init.queryEngineTools.map((tool)=>({
                description: tool.description
            }));
        this.summarizer = init.summarizer || (0, _responsesynthesizers.getResponseSynthesizer)("tree_summarize");
        this.verbose = init.verbose ?? false;
    }
    async _query(strOrQueryBundle, stream) {
        const response = await this.queryRoute(typeof strOrQueryBundle === "string" ? {
            query: strOrQueryBundle
        } : strOrQueryBundle);
        if (stream) {
            throw new Error("Streaming is not supported yet.");
        }
        return response;
    }
    _getPrompts() {
        return {};
    }
    _updatePrompts() {}
    _getPromptModules() {
        return {
            selector: this.selector,
            summarizer: this.summarizer
        };
    }
    static fromDefaults(init) {
        return new RouterQueryEngine({
            selector: init.selector ?? new _index.LLMSingleSelector({
                llm: _Settings.Settings.llm
            }),
            queryEngineTools: init.queryEngineTools,
            summarizer: init.summarizer,
            verbose: init.verbose
        });
    }
    async queryRoute(query) {
        const result = await this.selector.select(this.metadatas, query);
        if (result.selections.length > 1) {
            const responses = [];
            for(let i = 0; i < result.selections.length; i++){
                const engineInd = result.selections[i];
                const logStr = `Selecting query engine ${engineInd.index}: ${result.selections[i].index}.`;
                if (this.verbose) {
                    console.log(logStr + "\n");
                }
                const selectedQueryEngine = this.queryEngines[engineInd.index];
                responses.push(await selectedQueryEngine.query({
                    query,
                    stream: false
                }));
            }
            if (responses.length > 1) {
                const finalResponse = await combineResponses(this.summarizer, responses, query, this.verbose);
                return finalResponse;
            } else {
                return responses[0];
            }
        } else {
            let selectedQueryEngine;
            try {
                selectedQueryEngine = this.queryEngines[result.selections[0].index];
                const logStr = `Selecting query engine ${result.selections[0].index}: ${result.selections[0].reason}`;
                if (this.verbose) {
                    console.log(logStr + "\n");
                }
            } catch (e) {
                throw new Error("Failed to select query engine");
            }
            if (!selectedQueryEngine) {
                throw new Error("Selected query engine is null");
            }
            const finalResponse = await selectedQueryEngine.query({
                query: (0, _utils.extractText)(query)
            });
            // add selected result
            finalResponse.metadata = finalResponse.metadata || {};
            finalResponse.metadata["selectorResult"] = result;
            return finalResponse;
        }
    }
}
