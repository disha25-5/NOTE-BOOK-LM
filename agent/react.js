import { AgentRunner, AgentWorker, callTool, consumeAsyncIterable, createReadableStream, validateAgentParams } from "@llamaindex/core/agent";
import { extractText, stringifyJSONToMessageContent } from "@llamaindex/core/utils";
import { randomUUID } from "@llamaindex/env";
import { getReACTAgentSystemHeader } from "../internal/prompt/react.js";
import { isAsyncIterable } from "../internal/utils.js";
import { Settings } from "../Settings.js";
function reasonFormatter(reason) {
    switch(reason.type){
        case "observation":
            return `Observation: ${stringifyJSONToMessageContent(reason.observation)}`;
        case "action":
            return `Thought: ${reason.thought}\nAction: ${reason.action}\nInput: ${stringifyJSONToMessageContent(reason.input)}`;
        case "response":
            {
                return `Thought: ${reason.thought}\nAnswer: ${extractText(reason.response.message.content)}`;
            }
    }
}
function extractJsonStr(text) {
    const pattern = /\{.*\}/s;
    const match = text.match(pattern);
    if (!match) {
        throw new SyntaxError(`Could not extract json string from output: ${text}`);
    }
    return match[0];
}
function extractFinalResponse(inputText) {
    const pattern = /\s*Thought:(.*?)Answer:(.*?)$/s;
    const match = inputText.match(pattern);
    if (!match) {
        throw new Error(`Could not extract final answer from input text: ${inputText}`);
    }
    const thought = match[1].trim();
    const answer = match[2].trim();
    return [
        thought,
        answer
    ];
}
function extractToolUse(inputText) {
    const pattern = /\s*Thought: (.*?)\nAction: ([a-zA-Z0-9_]+).*?\.*[Input:]*.*?(\{.*?\})/s;
    const match = inputText.match(pattern);
    if (!match) {
        throw new Error(`Could not extract tool use from input text: "${inputText}"`);
    }
    const thought = match[1].trim();
    const action = match[2].trim();
    const actionInput = match[3].trim();
    return [
        thought,
        action,
        actionInput
    ];
}
function actionInputParser(jsonStr) {
    const processedString = jsonStr.replace(/(?<!\w)'|'(?!\w)/g, '"');
    const pattern = /"(\w+)":\s*"([^"]*)"/g;
    const matches = [
        ...processedString.matchAll(pattern)
    ];
    return Object.fromEntries(matches);
}
const reACTOutputParser = async (output, onResolveType)=>{
    let reason = null;
    if (isAsyncIterable(output)) {
        const [peakStream, finalStream] = createReadableStream(output).tee();
        const reader = peakStream.getReader();
        let type = null;
        let content = "";
        for(;;){
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            content += value.delta;
            if (content.includes("Action:")) {
                type = "action";
            } else if (content.includes("Answer:")) {
                type = "answer";
            }
        }
        if (type === null) {
            // `Thought:` is always present at the beginning of the output.
            type = "thought";
        }
        reader.releaseLock();
        if (!type) {
            throw new Error("Could not determine type of output");
        }
        onResolveType(type, finalStream);
        // step 2: do the parsing from content
        switch(type){
            case "action":
                {
                    // have to consume the stream to get the full content
                    const response = await consumeAsyncIterable(peakStream, content);
                    const [thought, action, input] = extractToolUse(response.content);
                    const jsonStr = extractJsonStr(input);
                    let json;
                    try {
                        json = JSON.parse(jsonStr);
                    } catch (e) {
                        json = actionInputParser(jsonStr);
                    }
                    reason = {
                        type: "action",
                        thought,
                        action,
                        input: json
                    };
                    break;
                }
            case "thought":
                {
                    const thought = "(Implicit) I can answer without any more tools!";
                    const response = await consumeAsyncIterable(peakStream, content);
                    reason = {
                        type: "response",
                        thought,
                        response: {
                            raw: peakStream,
                            message: response
                        }
                    };
                    break;
                }
            case "answer":
                {
                    const response = await consumeAsyncIterable(peakStream, content);
                    const [thought, answer] = extractFinalResponse(response.content);
                    reason = {
                        type: "response",
                        thought,
                        response: {
                            raw: response,
                            message: {
                                role: "assistant",
                                content: answer
                            }
                        }
                    };
                    break;
                }
            default:
                {
                    throw new Error(`Invalid type: ${type}`);
                }
        }
    } else {
        const content = extractText(output.message.content);
        const type = content.includes("Answer:") ? "answer" : content.includes("Action:") ? "action" : "thought";
        onResolveType(type, output);
        // step 2: do the parsing from content
        switch(type){
            case "action":
                {
                    const [thought, action, input] = extractToolUse(content);
                    const jsonStr = extractJsonStr(input);
                    let json;
                    try {
                        json = JSON.parse(jsonStr);
                    } catch (e) {
                        json = actionInputParser(jsonStr);
                    }
                    reason = {
                        type: "action",
                        thought,
                        action,
                        input: json
                    };
                    break;
                }
            case "thought":
                {
                    const thought = "(Implicit) I can answer without any more tools!";
                    reason = {
                        type: "response",
                        thought,
                        response: {
                            raw: output,
                            message: {
                                role: "assistant",
                                content: extractText(output.message.content)
                            }
                        }
                    };
                    break;
                }
            case "answer":
                {
                    const [thought, answer] = extractFinalResponse(content);
                    reason = {
                        type: "response",
                        thought,
                        response: {
                            raw: output,
                            message: {
                                role: "assistant",
                                content: answer
                            }
                        }
                    };
                    break;
                }
            default:
                {
                    throw new Error(`Invalid type: ${type}`);
                }
        }
    }
    if (reason === null) {
        throw new TypeError("Reason is null");
    }
    return reason;
};
const chatFormatter = async (tools, messages, currentReasons)=>{
    const header = getReACTAgentSystemHeader(tools);
    const reasonMessages = [];
    for (const reason of currentReasons){
        const response = await reasonFormatter(reason);
        reasonMessages.push({
            role: reason.type === "observation" ? "user" : "assistant",
            content: response
        });
    }
    return [
        {
            role: "system",
            content: header
        },
        ...messages,
        ...reasonMessages
    ];
};
export class ReACTAgentWorker extends AgentWorker {
    taskHandler = ReActAgent.taskHandler;
}
export class ReActAgent extends AgentRunner {
    constructor(params){
        validateAgentParams(params);
        super({
            llm: params.llm ?? Settings.llm,
            chatHistory: params.chatHistory ?? [],
            runner: new ReACTAgentWorker(),
            systemPrompt: params.systemPrompt ?? null,
            tools: "tools" in params ? params.tools : params.toolRetriever.retrieve.bind(params.toolRetriever),
            verbose: params.verbose ?? false
        });
    }
    createStore() {
        return {
            reasons: []
        };
    }
    static taskHandler = async (step, enqueueOutput)=>{
        const { llm, stream, getTools } = step.context;
        const lastMessage = step.context.store.messages.at(-1).content;
        const tools = await getTools(lastMessage);
        const messages = await chatFormatter(tools, step.context.store.messages, step.context.store.reasons);
        const response = await llm.chat({
            // @ts-expect-error boolean
            stream,
            messages
        });
        const reason = await reACTOutputParser(response, (type, response)=>{
            enqueueOutput({
                taskStep: step,
                output: response,
                isLast: type !== "action"
            });
        });
        step.context.logger.log("current reason: %O", reason);
        step.context.store.reasons = [
            ...step.context.store.reasons,
            reason
        ];
        if (reason.type === "action") {
            const tool = tools.find((tool)=>tool.metadata.name === reason.action);
            const toolOutput = await callTool(tool, {
                id: randomUUID(),
                input: reason.input,
                name: reason.action
            }, step.context.logger);
            step.context.store.reasons = [
                ...step.context.store.reasons,
                {
                    type: "observation",
                    observation: toolOutput.output
                }
            ];
        }
    };
}
