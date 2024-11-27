"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Inicio = () => {
    return (react_1.default.createElement("div", { style: { textAlign: 'center', marginTop: '50px' } },
        react_1.default.createElement("h1", null, "Bem-vindo ao App Taxi!"),
        react_1.default.createElement("p", null, "Estamos felizes em t\u00EA-lo conosco.")));
};
exports.default = Inicio;
