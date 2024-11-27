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
    return (<div>
      <h1>Histórico de Viagens</h1>
      <label>
        ID do Usuário:
        <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required/>
      </label>
      <label>
        ID do Motorista (opcional):
        <input type="text" value={driverId} onChange={(e) => setDriverId(e.target.value)}/>
      </label>
      <button onClick={handleFetchHistory}>Buscar Histórico</button>
      <ul>
        {rides.map((ride) => (<li key={ride.id}>
            <p>Data: {ride.date}</p>
            <p>Motorista: {ride.driver.name}</p>
            <p>Origem: {ride.origin}</p>
            <p>Destino: {ride.destination}</p>
            <p>Distância: {ride.distance} km</p>
            <p>Tempo: {ride.duration}</p>
            <p>Valor: R$ {ride.value}</p>
          </li>))}
      </ul>
    </div>);
};
exports.default = RideHistory;
