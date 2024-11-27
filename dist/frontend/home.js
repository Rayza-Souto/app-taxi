"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const react_1 = __importDefault(require("react"));
const Home = () => {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Home"),
        react_1.default.createElement("p", null, "Seja bem-vindo ao sistema de viagens!")));
};
exports.Home = Home;
exports.default = exports.Home;
