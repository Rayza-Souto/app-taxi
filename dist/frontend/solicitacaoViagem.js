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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const api_1 = __importDefault(require("./services/api")); // Importando o serviço de API
const RideRequestForm = () => {
    const [customerId, setCustomerId] = (0, react_1.useState)('');
    const [origin, setOrigin] = (0, react_1.useState)('');
    const [destination, setDestination] = (0, react_1.useState)('');
    const [response, setResponse] = (0, react_1.useState)(null); // Para exibir a resposta
    const navigate = (0, react_router_dom_1.useNavigate)();
    // Função para enviar os dados para o backend
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const res = yield api_1.default.get('/ride/estimate', {
                params: {
                    origin,
                    destination,
                },
            });
            setResponse(res.data); // Salva a resposta para exibição
            console.log('Resposta da API:', res.data);
        }
        catch (error) {
            console.error('Erro ao estimar viagem:', error);
            alert('Erro ao estimar viagem. Verifique os parâmetros e tente novamente.');
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Solicitar Viagem"),
        react_1.default.createElement("form", { onSubmit: handleSubmit },
            react_1.default.createElement("label", null,
                "ID do Usu\u00E1rio:",
                react_1.default.createElement("input", { type: "text", value: customerId, onChange: (e) => setCustomerId(e.target.value), required: true })),
            react_1.default.createElement("label", null,
                "Origem:",
                react_1.default.createElement("input", { type: "text", value: origin, onChange: (e) => setOrigin(e.target.value), required: true })),
            react_1.default.createElement("label", null,
                "Destino:",
                react_1.default.createElement("input", { type: "text", value: destination, onChange: (e) => setDestination(e.target.value), required: true })),
            react_1.default.createElement("button", { type: "submit" }, "Estimar Viagem")),
        response && (react_1.default.createElement("div", null,
            react_1.default.createElement("h2", null, "Estimativa da Viagem"),
            react_1.default.createElement("p", null,
                react_1.default.createElement("strong", null, "Origem:"),
                " ",
                response.origin),
            react_1.default.createElement("p", null,
                react_1.default.createElement("strong", null, "Destino:"),
                " ",
                response.destination),
            react_1.default.createElement("p", null,
                react_1.default.createElement("strong", null, "Dist\u00E2ncia:"),
                " ",
                response.distance),
            react_1.default.createElement("p", null,
                react_1.default.createElement("strong", null, "Dura\u00E7\u00E3o:"),
                " ",
                response.duration)))));
};
exports.default = RideRequestForm;
