//#region initial setup for OpenAI
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CallbackManager: function() {
        return _global.CallbackManager;
    },
    DEFAULT_BASE_URL: function() {
        return _global.DEFAULT_BASE_URL;
    },
    DEFAULT_CHUNK_OVERLAP: function() {
        return _global.DEFAULT_CHUNK_OVERLAP;
    },
    DEFAULT_CHUNK_OVERLAP_RATIO: function() {
        return _global.DEFAULT_CHUNK_OVERLAP_RATIO;
    },
    DEFAULT_CHUNK_SIZE: function() {
        return _global.DEFAULT_CHUNK_SIZE;
    },
    DEFAULT_COLLECTION: function() {
        return _global.DEFAULT_COLLECTION;
    },
    DEFAULT_CONTEXT_WINDOW: function() {
        return _global.DEFAULT_CONTEXT_WINDOW;
    },
    DEFAULT_DOC_STORE_PERSIST_FILENAME: function() {
        return _global.DEFAULT_DOC_STORE_PERSIST_FILENAME;
    },
    DEFAULT_GRAPH_STORE_PERSIST_FILENAME: function() {
        return _global.DEFAULT_GRAPH_STORE_PERSIST_FILENAME;
    },
    DEFAULT_INDEX_STORE_PERSIST_FILENAME: function() {
        return _global.DEFAULT_INDEX_STORE_PERSIST_FILENAME;
    },
    DEFAULT_NAMESPACE: function() {
        return _global.DEFAULT_NAMESPACE;
    },
    DEFAULT_NUM_OUTPUTS: function() {
        return _global.DEFAULT_NUM_OUTPUTS;
    },
    DEFAULT_PADDING: function() {
        return _global.DEFAULT_PADDING;
    },
    DEFAULT_PERSIST_DIR: function() {
        return _global.DEFAULT_PERSIST_DIR;
    },
    DEFAULT_PROJECT_NAME: function() {
        return _global.DEFAULT_PROJECT_NAME;
    },
    DEFAULT_VECTOR_STORE_PERSIST_FILENAME: function() {
        return _global.DEFAULT_VECTOR_STORE_PERSIST_FILENAME;
    },
    LlamaParseReader: function() {
        return _reader.LlamaParseReader;
    },
    Settings: function() {
        return _Settings.Settings;
    },
    imageToDataUrl: function() {
        return _utils.imageToDataUrl;
    }
});
const _openai = _export_star(require("@llamaindex/openai"), exports);
const _Settings = require("./Settings.js");
const _reader = require("@llamaindex/cloud/reader");
_export_star(require("@llamaindex/core/agent"), exports);
_export_star(require("@llamaindex/core/chat-engine"), exports);
_export_star(require("@llamaindex/core/data-structs"), exports);
_export_star(require("@llamaindex/core/embeddings"), exports);
const _global = require("@llamaindex/core/global");
_export_star(require("@llamaindex/core/indices"), exports);
_export_star(require("@llamaindex/core/llms"), exports);
_export_star(require("@llamaindex/core/memory"), exports);
_export_star(require("@llamaindex/core/postprocessor"), exports);
_export_star(require("@llamaindex/core/prompts"), exports);
_export_star(require("@llamaindex/core/query-engine"), exports);
_export_star(require("@llamaindex/core/response-synthesizers"), exports);
_export_star(require("@llamaindex/core/retriever"), exports);
_export_star(require("@llamaindex/core/schema"), exports);
_export_star(require("@llamaindex/core/storage/chat-store"), exports);
_export_star(require("@llamaindex/core/storage/doc-store"), exports);
_export_star(require("@llamaindex/core/storage/index-store"), exports);
_export_star(require("@llamaindex/core/storage/kv-store"), exports);
_export_star(require("@llamaindex/core/utils"), exports);
_export_star(require("@llamaindex/workflow"), exports);
_export_star(require("@llamaindex/workflow/agent"), exports);
_export_star(require("./agent/index.js"), exports);
_export_star(require("./cloud/index.js"), exports);
_export_star(require("./engines/chat/index.js"), exports);
_export_star(require("./engines/query/index.js"), exports);
_export_star(require("./evaluation/index.js"), exports);
_export_star(require("./extractors/index.js"), exports);
_export_star(require("./indices/index.js"), exports);
_export_star(require("./ingestion/index.js"), exports);
const _utils = require("./internal/utils.js");
_export_star(require("./node-parser.js"), exports);
_export_star(require("./objects/index.js"), exports);
_export_star(require("./OutputParser.js"), exports);
_export_star(require("./postprocessors/index.js"), exports);
_export_star(require("./QuestionGenerator.js"), exports);
_export_star(require("./selectors/index.js"), exports);
_export_star(require("./storage/StorageContext.js"), exports);
_export_star(require("./tools/index.js"), exports);
_export_star(require("./types.js"), exports);
function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}
try {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    _Settings.Settings.llm;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    _Settings.Settings.embedModel;
} catch  {
    _Settings.Settings.llm = new _openai.OpenAI();
    _Settings.Settings.embedModel = new _openai.OpenAIEmbedding();
}
