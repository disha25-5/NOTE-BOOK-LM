"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SimpleDocumentStore", {
    enumerable: true,
    get: function() {
        return SimpleDocumentStore;
    }
});
const _global = require("@llamaindex/core/global");
const _docstore = require("@llamaindex/core/storage/doc-store");
const _kvstore = require("@llamaindex/core/storage/kv-store");
const _env = require("@llamaindex/env");
const _lodash = /*#__PURE__*/ _interop_require_default(require("lodash"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class SimpleDocumentStore extends _docstore.KVDocumentStore {
    kvStore;
    constructor(kvStore, namespace){
        kvStore = kvStore || new _kvstore.SimpleKVStore();
        namespace = namespace || _global.DEFAULT_NAMESPACE;
        super(kvStore, namespace);
        this.kvStore = kvStore;
    }
    static async fromPersistDir(persistDir = _global.DEFAULT_PERSIST_DIR, namespace) {
        const persistPath = _env.path.join(persistDir, _global.DEFAULT_DOC_STORE_PERSIST_FILENAME);
        return await SimpleDocumentStore.fromPersistPath(persistPath, namespace);
    }
    static async fromPersistPath(persistPath, namespace) {
        const simpleKVStore = await _kvstore.SimpleKVStore.fromPersistPath(persistPath);
        return new SimpleDocumentStore(simpleKVStore, namespace);
    }
    async persist(persistPath = _env.path.join(_global.DEFAULT_PERSIST_DIR, _global.DEFAULT_DOC_STORE_PERSIST_FILENAME)) {
        if (_lodash.default.isObject(this.kvStore) && this.kvStore instanceof _kvstore.BaseInMemoryKVStore) {
            await this.kvStore.persist(persistPath);
        }
    }
    static fromDict(saveDict, namespace) {
        const simpleKVStore = _kvstore.SimpleKVStore.fromDict(saveDict);
        return new SimpleDocumentStore(simpleKVStore, namespace);
    }
    toDict() {
        if (_lodash.default.isObject(this.kvStore) && this.kvStore instanceof _kvstore.SimpleKVStore) {
            return this.kvStore.toDict();
        }
        // If the kvstore is not a SimpleKVStore, you might want to throw an error or return a default value.
        throw new Error("KVStore is not a SimpleKVStore");
    }
}
