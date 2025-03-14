import { MetadataMode } from "@llamaindex/core/schema";
import _ from "lodash";
export const defaultFormatNodeBatchFn = (summaryNodes)=>{
    return summaryNodes.map((node, idx)=>{
        return `
Document ${idx + 1}:
${node.getContent(MetadataMode.LLM)}
        `.trim();
    }).join("\n\n");
};
export const defaultParseChoiceSelectAnswerFn = (answer, numChoices, raiseErr = false)=>{
    // split the line into the answer number and relevance score portions
    const lineTokens = answer.split("\n").map((line)=>{
        const lineTokens = line.split(",");
        if (lineTokens.length !== 2) {
            if (raiseErr) {
                throw new Error(`Invalid answer line: ${line}. Answer line must be of the form: answer_num: <int>, answer_relevance: <float>`);
            } else {
                return null;
            }
        }
        return lineTokens;
    }).filter((lineTokens)=>!_.isNil(lineTokens));
    // parse the answer number and relevance score
    return lineTokens.reduce((parseResult, lineToken)=>{
        try {
            const docNum = parseInt(lineToken[0].split(":")[1].trim());
            const answerRelevance = parseFloat(lineToken[1].split(":")[1].trim());
            if (docNum < 1 || docNum > numChoices) {
                if (raiseErr) {
                    throw new Error(`Invalid answer number: ${docNum}. Answer number must be between 1 and ${numChoices}`);
                }
            } else {
                parseResult[docNum] = answerRelevance;
            }
        } catch (e) {
            if (raiseErr) {
                throw e;
            }
        }
        return parseResult;
    }, {});
};
