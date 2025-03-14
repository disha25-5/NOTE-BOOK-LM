"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vocabularySize = exports.setMergeCacheSize = exports.isWithinTokenLimit = exports.estimateCost = exports.encodeGenerator = exports.encodeChatGenerator = exports.encodeChat = exports.encode = exports.decodeGenerator = exports.decodeAsyncGenerator = exports.decode = exports.countTokens = exports.clearMergeCache = void 0;
/* eslint-disable import/extensions */
const p50k_base_js_1 = __importDefault(require("../bpeRanks/p50k_base.js"));
const GptEncoding_js_1 = require("../GptEncoding.js");
__exportStar(require("../constants.js"), exports);
__exportStar(require("../specialTokens.js"), exports);
const api = GptEncoding_js_1.GptEncoding.getEncodingApi('p50k_edit', () => p50k_base_js_1.default);
const { decode, decodeAsyncGenerator, decodeGenerator, encode, encodeGenerator, isWithinTokenLimit, countTokens, encodeChat, encodeChatGenerator, vocabularySize, setMergeCacheSize, clearMergeCache, estimateCost, } = api;
exports.decode = decode;
exports.decodeAsyncGenerator = decodeAsyncGenerator;
exports.decodeGenerator = decodeGenerator;
exports.encode = encode;
exports.encodeGenerator = encodeGenerator;
exports.isWithinTokenLimit = isWithinTokenLimit;
exports.countTokens = countTokens;
exports.encodeChat = encodeChat;
exports.encodeChatGenerator = encodeChatGenerator;
exports.vocabularySize = vocabularySize;
exports.setMergeCacheSize = setMergeCacheSize;
exports.clearMergeCache = clearMergeCache;
exports.estimateCost = estimateCost;
// eslint-disable-next-line import/no-default-export
exports.default = api;
//# sourceMappingURL=p50k_edit.js.map