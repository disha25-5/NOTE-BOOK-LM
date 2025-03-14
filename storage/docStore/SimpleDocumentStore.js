import { DEFAULT_DOC_STORE_PERSIST_FILENAME, DEFAULT_NAMESPACE, DEFAULT_PERSIST_DIR } from "@llamaindex/core/global";
import { KVDocumentStore } from "@llamaindex/core/storage/doc-store";
import { BaseInMemoryKVStore, SimpleKVStore } from "@llamaindex/core/storage/kv-store";
import { path } from "@llamaindex/env";
import _ from "lodash";
export class SimpleDocumentStore extends KVDocumentStore {
    kvStore;
    constructor(kvStore, namespace){
        kvStore = kvStore || new SimpleKVStore();
        namespace = namespace || DEFAULT_NAMESPACE;
        super(kvStore, namespace);
        this.kvStore = kvStore;
    }
    static async fromPersistDir(persistDir = DEFAULT_PERSIST_DIR, namespace) {
        const persistPath = path.join(persistDir, DEFAULT_DOC_STORE_PERSIST_FILENAME);
        return await SimpleDocumentStore.fromPersistPath(persistPath, namespace);
    }
    static async fromPersistPath(persistPath, namespace) {
        const simpleKVStore = await SimpleKVStore.fromPersistPath(persistPath);
        return new SimpleDocumentStore(simpleKVStore, namespace);
    }
    async persist(persistPath = path.join(DEFAULT_PERSIST_DIR, DEFAULT_DOC_STORE_PERSIST_FILENAME)) {
        if (_.isObject(this.kvStore) && this.kvStore instanceof BaseInMemoryKVStore) {
            await this.kvStore.persist(persistPath);
        }
    }
    static fromDict(saveDict, namespace) {
        const simpleKVStore = SimpleKVStore.fromDict(saveDict);
        return new SimpleDocumentStore(simpleKVStore, namespace);
    }
    toDict() {
        if (_.isObject(this.kvStore) && this.kvStore instanceof SimpleKVStore) {
            return this.kvStore.toDict();
        }
        // If the kvstore is not a SimpleKVStore, you might want to throw an error or return a default value.
        throw new Error("KVStore is not a SimpleKVStore");
    }
}
