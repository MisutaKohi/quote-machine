"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables
let isConnected = false;
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MONGODB_URL) {
        console.log('Missing MongoDB URL among env variables');
        return false;
    }
    if (isConnected) {
        console.log('MongoDB connection already exists');
        return true;
    }
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
        isConnected = false;
    }
    return isConnected;
});
exports.connectToDB = connectToDB;
exports.default = exports.connectToDB;
