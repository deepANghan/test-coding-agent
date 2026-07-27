import { promises as fs } from "fs";
import path from "path";

async function listDirectory(
    { directory = "." }: { directory?: string } = {}
) {
    try {
        const files = await fs.readdir(directory, { withFileTypes: true });

        return {
            success: true,
            entries: files.map((file) => ({
                name: file.name,
                type: file.isDirectory() ? "directory" : "file",
            })),
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}

async function readFile(
    { filePath, encoding = "utf-8" }: {
        filePath: string;
        encoding?: BufferEncoding;
    }
) {
    try {
        const content = await fs.readFile(filePath, encoding);

        return {
            success: true,
            content,
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}

async function writeFile(
    { filePath, content }: {
        filePath: string;
        content: string;
    }
) {
    try {


        const directory = path.dirname(filePath);

        await fs.mkdir(directory, { recursive: true });
        await fs.writeFile(filePath, content, "utf-8");

        return {
            success: true,
            message: "File written successfully",
        };
    } catch (error) {
        return {
            success: false,
            error: (error as Error).message,
        };
    }
}

export { listDirectory, readFile, writeFile };