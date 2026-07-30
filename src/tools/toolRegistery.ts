import { listDirectory, readFile, writeFile } from "./fileTools.js";

const toolRegistery = [
    {
        "name": "listDirectory",
        "description": "List files and directories",
        "parameters": {
            "type": "object",
            "properties": {
                "directory": {
                    "type": "string",
                    "description": "Directory path to list"
                }
            }
        },
        "execute": listDirectory
    },
    {
        "name": "readFile",
        "description": "Read file contents",
        "parameters": {
            "type": "object",
            "properties": {
                "filePath": {
                    "type": "string",
                    "description": "Path of the file to read"
                }
            },
            "required": ["filePath"]
        },
        "execute": readFile
    },
    {
        "name": "writeFile",
        "description": "Write content to a file",
        "parameters": {
            "type": "object",
            "properties": {
                "filePath": {
                    "type": "string"
                },
                "content": {
                    "type": "string"
                }
            },
            "required": ["filePath", "content"]
        },
        "execute": writeFile
    }
];

function getOpenAITools() {

    return toolRegistery.map(tool => ({
        type: "function",
        function: {
            name: tool.name,
            description: tool.description,
            parameters: tool.parameters
        }
    }));

}

export async function executeTool(name: string, args: any) {

    const tool = toolRegistery.find(
        t => t.name === name
    );

    if (!tool) {
        throw new Error(`Unknown tool: ${name}`);
    }

    return tool.execute(args);
}

export { getOpenAITools };