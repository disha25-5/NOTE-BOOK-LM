// FS utility helpers
import { fs } from "@llamaindex/env";
/**
 * Checks if a file exists.
 * Analogous to the os.path.exists function from Python.
 * @param path The path to the file to check.
 * @returns A promise that resolves to true if the file exists, false otherwise.
 */ export async function exists(path) {
    try {
        await fs.access(path);
        return true;
    } catch  {
        return false;
    }
}
/**
 * Recursively traverses a directory and yields all the paths to the files in it.
 * @param dirPath The path to the directory to traverse.
 */ export async function* walk(dirPath) {
    const entries = await fs.readdir(dirPath);
    for (const entry of entries){
        const fullPath = `${dirPath}/${entry}`;
        const stats = await fs.stat(fullPath);
        if (stats.isDirectory()) {
            yield* walk(fullPath);
        } else {
            yield fullPath;
        }
    }
}
