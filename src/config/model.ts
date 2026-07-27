import { OpenRouter } from "@openrouter/sdk";
import { configDotenv } from "dotenv";

configDotenv();

const llmClient = new OpenRouter({
    apiKey: process.env.OPENROUTER_KEY,
    appTitle: "Test-Coding-Agent"
});

export { llmClient };