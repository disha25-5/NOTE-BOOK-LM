"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RelevancyEvaluator", {
    enumerable: true,
    get: function() {
        return RelevancyEvaluator;
    }
});
const _prompts = require("@llamaindex/core/prompts");
const _schema = require("@llamaindex/core/schema");
const _utils = require("@llamaindex/core/utils");
const _index = require("../indices/summary/index.js");
const _prompts1 = require("./prompts.js");
class RelevancyEvaluator extends _prompts.PromptMixin {
    raiseError;
    evalTemplate;
    refineTemplate;
    constructor(params){
        super();
        this.raiseError = params?.raiseError ?? false;
        this.evalTemplate = params?.evalTemplate ?? _prompts1.defaultRelevancyEvalPrompt;
        this.refineTemplate = params?.refineTemplate ?? _prompts1.defaultRelevancyRefinePrompt;
    }
    _getPromptModules() {
        return {};
    }
    _getPrompts() {
        return {
            evalTemplate: this.evalTemplate,
            refineTemplate: this.refineTemplate
        };
    }
    _updatePrompts(prompts) {
        if ("evalTemplate" in prompts) {
            this.evalTemplate = prompts["evalTemplate"];
        }
        if ("refineTemplate" in prompts) {
            this.refineTemplate = prompts["refineTemplate"];
        }
    }
    async evaluate({ query, response, contexts = [], sleepTimeInSeconds = 0 }) {
        if (query === null || response === null) {
            throw new Error("query, contexts, and response must be provided");
        }
        await new Promise((resolve)=>setTimeout(resolve, sleepTimeInSeconds * 1000));
        const docs = contexts?.map((context)=>new _schema.Document({
                text: context
            }));
        const index = await _index.SummaryIndex.fromDocuments(docs, {});
        const queryResponse = `Question: ${(0, _utils.extractText)(query)}\nResponse: ${response}`;
        const queryEngine = index.asQueryEngine();
        queryEngine.updatePrompts({
            "responseSynthesizer:textQATemplate": this.evalTemplate,
            "responseSynthesizer:refineTemplate": this.refineTemplate
        });
        const responseObj = await queryEngine.query({
            query: queryResponse
        });
        const rawResponseTxt = responseObj.toString();
        let passing;
        if (rawResponseTxt.toLowerCase().includes("yes")) {
            passing = true;
        } else {
            passing = false;
            if (this.raiseError) {
                throw new Error("The response is invalid");
            }
        }
        return {
            query,
            contexts,
            response,
            passing,
            score: passing ? 1.0 : 0.0,
            feedback: rawResponseTxt
        };
    }
    /**
   * @param query Query to evaluate
   * @param response  Response to evaluate
   */ async evaluateResponse({ query, response }) {
        const responseStr = (0, _utils.extractText)(response?.message.content);
        const contexts = [];
        if (response) {
            for (const node of response.sourceNodes || []){
                contexts.push(node.node.getContent(_schema.MetadataMode.ALL));
            }
        }
        return this.evaluate({
            query,
            response: responseStr,
            contexts
        });
    }
}
