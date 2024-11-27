"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const opcoesViagem_1 = __importDefault(require("./frontend/opcoesViagem"));
const historicoViagens_1 = __importDefault(require("./frontend/historicoViagens"));
const home_1 = __importDefault(require("./frontend/home"));
const AppRotas = () => {
    return (react_1.default.createElement(react_router_dom_1.Routes, null,
        react_1.default.createElement(react_router_dom_1.Route, { path: "/", element: react_1.default.createElement(home_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/ride/estimate", element: react_1.default.createElement(opcoesViagem_1.default, null) }),
        react_1.default.createElement(react_router_dom_1.Route, { path: "/ride/:customer_id", element: react_1.default.createElement(historicoViagens_1.default, null) })));
};
exports.default = AppRotas;
