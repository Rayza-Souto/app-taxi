"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path")); // Importando path para servir arquivos estáticos
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080;
app.use(express_1.default.static(path_1.default.join(__dirname, 'build')));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "index.html"));
});
