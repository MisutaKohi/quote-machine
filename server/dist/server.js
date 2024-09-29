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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("./mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const hashing_1 = __importDefault(require("./utils/hashing"));
const app = (0, express_1.default)();
const port = 4000;
dotenv_1.default.config(); // configures environment
app.use((0, cors_1.default)());
(0, mongoose_1.default)();
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send('It worked!');
    const quote = {
        author: 'Dumbledore',
        text: 'Do you not see?'
    };
    const hash = (0, hashing_1.default)(quote);
    console.log(hash);
}));
app.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
});
