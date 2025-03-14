"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FaithfulnessEvaluator", {
    enumerable: true,
    get: function() {
        return FaithfulnessEvaluator;
    }
});
const _prompts = require("@llamaindex/core/prompts");
const _schema = require("@llamaindex/core/schema");
const _utils = require("@llamaindex/core/utils");
const _index = require("../indices/summary/index.js");
const _prompts1 = require("./prompts.js");
class FaithfulnessEvaluator extends _prompts.PromptMixin {
    raiseError;
    evalTemplate;
    refineTemplate;
    constructor(params){
        super();
        this.raiseError = params?.raiseError ?? false;
        this.evalTemplate = params?.faithfulnessSystemPrompt ?? _prompts1.defaultFaithfulnessTextQaPrompt;
        this.refineTemplate = params?.faithFulnessRefinePrompt ?? _prompts1.defaultFaithfulnessRefinePrompt;
    }
    _getPromptModules() {
        return {};
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _getPrompts() {
        return {
            faithfulnessSystemPrompt: this.evalTemplate,
            faithFulnessRefinePrompt: this.refineTemplate
        };
    }
    _updatePrompts(promptsDict) {
        if (promptsDict.faithfulnessSystemPrompt) {
            this.evalTemplate = promptsDict.faithfulnessSystemPrompt;
        }
        if (promptsDict.faithFulnessRefinePrompt) {
            this.refineTemplate = promptsDict.faithFulnessRefinePrompt;
        }
    }
    /**
   * @param query Query to evaluate
   * @param response  Response to evaluate
   * @param contexts Array of contexts
   * @param reference  Reference response
   * @param sleepTimeInSeconds  Sleep time in seconds
   */ async evaluate({ query, response, contexts = [], reference, sleepTimeInSeconds = 0 }) {
        if (query === null || response === null) {
            throw new Error("query, and response must be provided");
        }
        await new Promise((resolve)=>setTimeout(resolve, sleepTimeInSeconds * 1000));
        const docs = contexts?.map((context)=>new _schema.Document({
                text: context
            }));
        const index = await _index.SummaryIndex.fromDocuments(docs, {});
        const queryEngine = index.asQueryEngine();
        queryEngine.updatePrompts({
            "responseSynthesizer:textQATemplate": this.evalTemplate,
            "responseSynthesizer:refineTemplate": this.refineTemplate
        });
        const responseObj = await queryEngine.query({
            query: {
                query: response
            },
            stream: false
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
