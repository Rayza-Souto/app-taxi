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
    return (<react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<home_1.default />}/>
            <react_router_dom_1.Route path="/ride/estimate" element={<opcoesViagem_1.default />}/>
            <react_router_dom_1.Route path="/ride/:customer_id" element={<historicoViagens_1.default />}/>
        </react_router_dom_1.Routes>);
};
exports.default = AppRotas;
