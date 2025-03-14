export { AsyncLocalStorage } from 'node:async_hooks';
import * as node_fs_promises from 'node:fs/promises';
export { default as path } from 'pathe';

declare class NotSupportCurrentRuntimeClass {
    constructor(runtime: string);
    static bind(runtime: string): {
        new (...args: any[]): {};
        bind(runtime: string): /*elided*/ any;
    };
}

declare function createWriteStream(): void;
declare const fs: typeof node_fs_promises;

/**
 * This function ensures the correct decodings of percent-encoded characters as
 * well as ensuring a cross-platform valid absolute path string.
 */
declare function fileURLToPath(href: string, separator: string): string;

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

declare const Readable: {
    new (...args: any[]): {};
    bind(runtime: string): /*elided*/ any;
};
interface SHA256 {
    update(data: string | Uint8Array): void;
    digest(): string;
}
declare const EOL = "\n";
declare function ok(value: unknown, message?: string): asserts value;
declare function createSHA256(): SHA256;
declare function randomUUID(): string;
declare const process: NodeJS.Process;

type Logger = {
    log: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
};
declare const emptyLogger: Logger;
declare const consoleLogger: Logger;

declare function getEnv(name: string): string | undefined;

export { defaultCustomEvent as CustomEvent, EOL, type Logger, NotSupportCurrentRuntimeClass, Readable, type SHA256, consoleLogger, createSHA256, createWriteStream, emptyLogger, fileURLToPath, fs, getEnv, ok, process, randomUUID, setEnvs };
