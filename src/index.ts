import { callLLM } from "./llm/llm.js";
import { SYSTEM_PROMPT } from "./prompts/system_prompt_v1.js";
import type { State } from "./types/types.js";

async function main() {
    const state: State = {
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT
            },
            {
                role: "user",
                content: "Read the file package.json and tell me the name"
            }
        ]
    };

    const result = await callLLM(state);

    console.log(
        result?.messages[result.messages.length - 1]
    );
}

main().catch(console.error);