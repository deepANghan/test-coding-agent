import type { ChatFunctionTool, ChatMessages } from "@openrouter/sdk/models";
import { llmClient } from "../config/model.js";
import type { State } from "../types/types.js";
import { executeTool, getOpenAITools } from "../tools/toolRegistery.js";

const llmModel = "openai/gpt-oss-20b:free";

async function callLLM(state: State) {

    try {
        const tools = getOpenAITools();

        const res = await llmClient.chat.send({
            chatRequest: {
                model: llmModel,
                messages: state.messages as ChatMessages[],
                toolChoice: "auto",
                tools: tools as ChatFunctionTool[]
            }
        }) as any;

        const message = res.choices[0].message;

        state.messages.push(message);

        if (message.toolCalls) {
            for (const toolCall of message.toolCalls) {
                const toolName = toolCall.function.name;

                const args = JSON.parse(
                    toolCall.function.arguments
                );

                console.log("Tool requested:", toolName);
                console.log("Arguments:", args);

                const result = await executeTool(toolName, args);

                state.messages.push({
                    role: "tool",
                    toolCallId: toolCall.id,
                    content: JSON.stringify(result)
                });
            }

            return callLLM(state);
        }

        return state;

    } catch (error) {

        console.log(error);
        throw error;
    }
}

export { callLLM };