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
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const api_1 = __importDefault(require("./services/api"));
const RideOptions = () => {
    var _a;
    const location = (0, react_router_dom_1.useLocation)(); //pega a localização atual
    const navigate = (0, react_router_dom_1.useNavigate)(); //navega para outra rota
    const data = (_a = location.state) === null || _a === void 0 ? void 0 : _a.data; //pega os dados da localização atual
    if (!data) {
        return <p>Nenhuma informação disponível. Por favor, retorne à tela inicial.</p>;
    }
    const handleChooseDriver = (driver) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            yield api_1.default.patch('/ride/confirm', {
                customer_id: data.customer_id,
                origin: data.origin,
                destination: data.destination,
                distance: data.distance,
                duration: data.duration,
                driver: { id: driver.id, name: driver.name },
                value: driver.value,
            });
        }
        catch (error) {
            alert(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error_description) || 'Erro ao confirmar a viagem.');
        }
    });
    return (<div>
      <h1>Opções de Viagem</h1>
      <p>Origem: {data.origin.latitude}, {data.origin.longitude}</p>
      <p>Destino: {data.destination.latitude}, {data.destination.longitude}</p>
      <p>Distância: {data.distance} km</p>
      <p>Duração: {data.duration}</p>
      <h2>Motoristas Disponíveis</h2>
      <ul>
        {data.options.map((option) => (<li key={option.id}>
            <strong>{option.name}</strong> - {option.vehicle}
            <br />
            <em>{option.description}</em>
            <br />
            Valor: R${option.value.toFixed(2)}
            <br />
            <button onClick={() => handleChooseDriver(option)}>Escolher</button>
          </li>))}
      </ul>
    </div>);
};
exports.default = RideOptions;
