import { PromptMixin } from "@llamaindex/core/prompts";
import { Document, MetadataMode } from "@llamaindex/core/schema";
import { extractText } from "@llamaindex/core/utils";
import { SummaryIndex } from "../indices/summary/index.js";
import { defaultRelevancyEvalPrompt, defaultRelevancyRefinePrompt } from "./prompts.js";
export class RelevancyEvaluator extends PromptMixin {
    raiseError;
    evalTemplate;
    refineTemplate;
    constructor(params){
        super();
        this.raiseError = params?.raiseError ?? false;
        this.evalTemplate = params?.evalTemplate ?? defaultRelevancyEvalPrompt;
        this.refineTemplate = params?.refineTemplate ?? defaultRelevancyRefinePrompt;
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
        const docs = contexts?.map((context)=>new Document({
                text: context
            }));
        const index = await SummaryIndex.fromDocuments(docs, {});
        const queryResponse = `Question: ${extractText(query)}\nResponse: ${response}`;
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
        const responseStr = extractText(response?.message.content);
        const contexts = [];
        if (response) {
            for (const node of response.sourceNodes || []){
                contexts.push(node.node.getContent(MetadataMode.ALL));
            }
        }
        return this.evaluate({
            query,
            response: responseStr,
            contexts
        });
    }
}
