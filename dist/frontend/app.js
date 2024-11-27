"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const solicitacaoViagem_1 = __importDefault(require("../frontend/solicitacaoViagem"));
const opcoesViagem_1 = __importDefault(require("../frontend/opcoesViagem"));
const historicoViagens_1 = __importDefault(require("../frontend/historicoViagens"));
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<solicitacaoViagem_1.default />}/>
        <react_router_dom_1.Route path="/options" element={<opcoesViagem_1.default />}/>
        <react_router_dom_1.Route path="/history" element={<historicoViagens_1.default />}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
