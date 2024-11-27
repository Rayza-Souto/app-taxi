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
const api_1 = __importDefault(require("./services/api"));
const RideHistory = () => {
    const [customerId, setCustomerId] = (0, react_1.useState)('');
    const [driverId, setDriverId] = (0, react_1.useState)('');
    const [rides, setRides] = (0, react_1.useState)([]);
    const handleFetchHistory = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const query = driverId ? `?driver_id=${driverId}` : '';
            const response = yield api_1.default.get(`/ride/${customerId}${query}`);
            setRides(response.data.rides);
        }
        catch (error) {
            alert(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error_description) || 'Erro ao buscar o histórico.');
        }
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Hist\u00F3rico de Viagens"),
        react_1.default.createElement("label", null,
            "ID do Usu\u00E1rio:",
            react_1.default.createElement("input", { type: "text", value: customerId, onChange: (e) => setCustomerId(e.target.value), required: true })),
        react_1.default.createElement("label", null,
            "ID do Motorista (opcional):",
            react_1.default.createElement("input", { type: "text", value: driverId, onChange: (e) => setDriverId(e.target.value) })),
        react_1.default.createElement("button", { onClick: handleFetchHistory }, "Buscar Hist\u00F3rico"),
        react_1.default.createElement("ul", null, rides.map((ride) => (react_1.default.createElement("li", { key: ride.id },
            react_1.default.createElement("p", null,
                "Data: ",
                ride.date),
            react_1.default.createElement("p", null,
                "Motorista: ",
                ride.driver.name),
            react_1.default.createElement("p", null,
                "Origem: ",
                ride.origin),
            react_1.default.createElement("p", null,
                "Destino: ",
                ride.destination),
            react_1.default.createElement("p", null,
                "Dist\u00E2ncia: ",
                ride.distance,
                " km"),
            react_1.default.createElement("p", null,
                "Tempo: ",
                ride.duration),
            react_1.default.createElement("p", null,
                "Valor: R$ ",
                ride.value)))))));
};
exports.default = RideHistory;
