"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CorrectnessEvaluator", {
    enumerable: true,
    get: function() {
        return CorrectnessEvaluator;
    }
});
const _prompts = require("@llamaindex/core/prompts");
const _schema = require("@llamaindex/core/schema");
const _utils = require("@llamaindex/core/utils");
const _Settings = require("../Settings.js");
const _prompts1 = require("./prompts.js");
const _utils1 = require("./utils.js");
class CorrectnessEvaluator extends _prompts.PromptMixin {
    scoreThreshold;
    parserFunction;
    llm;
    correctnessPrompt = _prompts1.defaultCorrectnessSystemPrompt;
    constructor(params){
        super();
        this.llm = _Settings.Settings.llm;
        this.correctnessPrompt = _prompts1.defaultCorrectnessSystemPrompt;
        this.scoreThreshold = params?.scoreThreshold ?? 4.0;
        this.parserFunction = params?.parserFunction ?? _utils1.defaultEvaluationParser;
    }
    _getPrompts() {
        return {
            correctnessPrompt: this.correctnessPrompt
        };
    }
    _getPromptModules() {
        return {};
    }
    _updatePrompts(prompts) {
        if ("correctnessPrompt" in prompts) {
            this.correctnessPrompt = prompts["correctnessPrompt"];
        }
    }
    /**
   *
   * @param query Query to evaluate
   * @param response  Response to evaluate
   * @param contexts Array of contexts
   * @param reference  Reference response
   */ async evaluate({ query, response, contexts, reference }) {
        if (query === null || response === null) {
            throw new Error("query, and response must be provided");
        }
        const messages = [
            {
                role: "system",
                content: this.correctnessPrompt.format()
            },
            {
                role: "user",
                content: _prompts1.defaultUserPrompt.format({
                    query: (0, _utils.extractText)(query),
                    generatedAnswer: response,
                    referenceAnswer: reference || "(NO REFERENCE ANSWER SUPPLIED)"
                })
            }
        ];
        const evalResponse = await this.llm.chat({
            messages
        });
        const [score, reasoning] = this.parserFunction((0, _utils.extractText)(evalResponse.message.content));
        return {
            query: query,
            response: response,
            passing: score >= this.scoreThreshold || score === null,
            score: score,
            feedback: reasoning
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
