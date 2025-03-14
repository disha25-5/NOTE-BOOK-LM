import * as node_fs_promises from 'node:fs/promises';
export { default as path } from 'pathe';

declare class AsyncLocalStorage<T> {
    #private;
    static bind<Func extends (...args: any[]) => any>(fn: Func): Func;
    static snapshot(): <R, TArgs extends any[]>(fn: (...args: TArgs) => R, ...args: TArgs) => R;
    getStore(): T;
    run<R>(store: T, cb: () => R): R;
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

declare function createWriteStream(): void;
declare const fs: typeof node_fs_promises;

/**
 * This function ensures the correct decodings of percent-encoded characters as
 * well as ensuring a cross-platform valid absolute path string.
 */
declare function fileURLToPath(href: string, separator: string): string;

declare function setEnvs(envs: object): void;
declare function getEnv(name: string): string | undefined;
declare const defaultCustomEvent: any;

declare const processProxy: NodeJS.Process;

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

export { AsyncLocalStorage, defaultCustomEvent as CustomEvent, EOL, type Logger, NotSupportCurrentRuntimeClass, Readable, type SHA256, consoleLogger, createSHA256, createWriteStream, emptyLogger, fileURLToPath, fs, getEnv, ok, processProxy as process, randomUUID, setEnvs };
