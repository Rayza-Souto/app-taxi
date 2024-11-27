var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useState } from 'react';
import app from './services/api';
const RideHistory = () => {
    const [customerId, setCustomerId] = useState('');
    const [driverId, setDriverId] = useState('');
    const [rides, setRides] = useState([]);
    const handleFetchHistory = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            const query = driverId ? `?driver_id=${driverId}` : '';
            const response = yield app.get(`/ride/${customerId}${query}`);
            setRides(response.data.rides);
        }
        catch (error) {
            alert(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error_description) || 'Erro ao buscar o histórico.');
        }
    });
    return (React.createElement("div", null,
        React.createElement("h1", null, "Hist\u00F3rico de Viagens"),
        React.createElement("label", null,
            "ID do Usu\u00E1rio:",
            React.createElement("input", { type: "text", value: customerId, onChange: (e) => setCustomerId(e.target.value), required: true })),
        React.createElement("label", null,
            "ID do Motorista (opcional):",
            React.createElement("input", { type: "text", value: driverId, onChange: (e) => setDriverId(e.target.value) })),
        React.createElement("button", { onClick: handleFetchHistory }, "Buscar Hist\u00F3rico"),
        React.createElement("ul", null, rides.map((ride) => (React.createElement("li", { key: ride.id },
            React.createElement("p", null,
                "Data: ",
                ride.date),
            React.createElement("p", null,
                "Motorista: ",
                ride.driver.name),
            React.createElement("p", null,
                "Origem: ",
                ride.origin),
            React.createElement("p", null,
                "Destino: ",
                ride.destination),
            React.createElement("p", null,
                "Dist\u00E2ncia: ",
                ride.distance,
                " km"),
            React.createElement("p", null,
                "Tempo: ",
                ride.duration),
            React.createElement("p", null,
                "Valor: R$ ",
                ride.value)))))));
};
export default RideHistory;
