Object.defineProperty(exports, '__esModule', { value: true });

var index_cjs = require('../../utils/dist/index.cjs');

class BaseLLM {
    async complete(params) {
        const { prompt, stream } = params;
        if (stream) {
            const stream = await this.chat({
                messages: [
                    {
                        content: prompt,
                        role: "user"
                    }
                ],
                stream: true
            });
            return index_cjs.streamConverter(stream, (chunk)=>{
                return {
                    raw: null,
                    text: chunk.delta
                };
            });
        }
        const chatResponse = await this.chat({
            messages: [
                {
                    content: prompt,
                    role: "user"
                }
            ]
        });
        return {
            text: index_cjs.extractText(chatResponse.message.content),
            raw: chatResponse.raw
        };
    }
}
class ToolCallLLM extends BaseLLM {
}

exports.BaseLLM = BaseLLM;
exports.ToolCallLLM = ToolCallLLM;
