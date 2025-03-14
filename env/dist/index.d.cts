export { ok } from 'node:assert';
export { randomUUID } from 'node:crypto';
export { EOL } from 'node:os';
export { default as path } from 'node:path';
export { Readable } from 'node:stream';
export { fileURLToPath } from 'node:url';
export { createWriteStream } from 'node:fs';
export { default as fs } from 'node:fs/promises';
export { AsyncLocalStorage } from 'node:async_hooks';

/**
 * Set environment variables before using llamaindex, because some LLM need to access API key before running.
 *
 * You have to set the environment variables in Cloudflare Worker environment,
 * because it doesn't have any global environment variables.
 *
 * @example
 * ```ts
 * export default {
 *   async fetch(
 *     request: Request,
 *     env: Env,
 *     ctx: ExecutionContext,
 *   ): Promise<Response> {
 *     const { setEnvs } = await import("@llamaindex/env");
 *     setEnvs(env);
 *     // ...
 *     return new Response("Hello, World!");
 *   },
 * };
 * ```
 *
 * @param envs Environment variables
 */
declare function setEnvs(envs: object): void;
declare function getEnv(name: string): string | undefined;
interface EventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
}
interface CustomEventInit<T = any> extends EventInit {
    detail?: T;
}
declare class CustomEvent<T = any> extends Event {
    #private;
    get detail(): T;
    constructor(event: string, options?: CustomEventInit);
    /**
     * @deprecated This method is not supported
     */
    initCustomEvent(): void;
}
declare const defaultCustomEvent: typeof CustomEvent;

interface SHA256 {
    update(data: string | Uint8Array): void;
    digest(): string;
}

type Logger = {
    log: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
};
declare const emptyLogger: Logger;
declare const consoleLogger: Logger;

declare class NotSupportCurrentRuntimeClass {
    constructor(runtime: string);
    static bind(runtime: string): {
        new (...args: any[]): {};
        bind(runtime: string): /*elided*/ any;
    };
}

/**
 * This module is under Node.js environment.
 * It provides a set of APIs to interact with the file system, streams, and other Node.js built-in modules.
 *
 * Use this under "node" condition,
 *
 * For example:
 * ```shell
 * node -e "const env = require('@llamaindex/env');"
 * ```
 *
 * @module
 */
/** rollup-private-do-not-use-esm-shim-polyfill */

declare function createSHA256(): SHA256;
declare const process: NodeJS.Process;

export { defaultCustomEvent as CustomEvent, type Logger, NotSupportCurrentRuntimeClass, consoleLogger, createSHA256, emptyLogger, getEnv, process, setEnvs };
