var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import app from './services/api';
const RideOptions = () => {
    var _a;
    const location = useLocation(); //pega a localização atual
    const navigate = useNavigate(); //navega para outra rota
    const data = (_a = location.state) === null || _a === void 0 ? void 0 : _a.data; //pega os dados da localização atual
    if (!data) {
        return React.createElement("p", null, "Nenhuma informa\u00E7\u00E3o dispon\u00EDvel. Por favor, retorne \u00E0 tela inicial.");
    }
    const handleChooseDriver = (driver) => __awaiter(void 0, void 0, void 0, function* () {
        var _b, _c;
        try {
            yield app.patch('/ride/confirm', {
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
            alert(((_c = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.error_description) || 'Erro ao confirmar a viagem.');
        }
    });
    return (React.createElement("div", null,
        React.createElement("h1", null, "Op\u00E7\u00F5es de Viagem"),
        React.createElement("p", null,
            "Origem: ",
            data.origin.latitude,
            ", ",
            data.origin.longitude),
        React.createElement("p", null,
            "Destino: ",
            data.destination.latitude,
            ", ",
            data.destination.longitude),
        React.createElement("p", null,
            "Dist\u00E2ncia: ",
            data.distance,
            " km"),
        React.createElement("p", null,
            "Dura\u00E7\u00E3o: ",
            data.duration),
        React.createElement("h2", null, "Motoristas Dispon\u00EDveis"),
        React.createElement("ul", null, data.options.map((option) => (React.createElement("li", { key: option.id },
            React.createElement("strong", null, option.name),
            " - ",
            option.vehicle,
            React.createElement("br", null),
            React.createElement("em", null, option.description),
            React.createElement("br", null),
            "Valor: R$",
            option.value.toFixed(2),
            React.createElement("br", null),
            React.createElement("button", { onClick: () => handleChooseDriver(option) }, "Escolher")))))));
};
export default RideOptions;
