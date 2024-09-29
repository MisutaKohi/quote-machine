"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const createHashKey = ({ author, text }) => {
    const combined = author + "" + text;
    return crypto_1.default.createHash('sha256').update(combined).digest('hex');
};
exports.default = createHashKey;
