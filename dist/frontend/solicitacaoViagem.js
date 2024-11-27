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
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Importando o serviço de API
const RideRequestForm = () => {
    const [customerId, setCustomerId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [response, setResponse] = useState(null); // Para exibir a resposta
    const navigate = useNavigate();
    // Função para enviar os dados para o backend
    const handleSubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const res = yield api.get('/', {
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
    return (React.createElement("div", null,
        React.createElement("h1", null, "Solicitar Viagem"),
        React.createElement("form", { onSubmit: handleSubmit },
            React.createElement("label", null,
                "ID do Usu\u00E1rio:",
                React.createElement("input", { type: "text", value: customerId, onChange: (e) => setCustomerId(e.target.value), required: true })),
            React.createElement("label", null,
                "Origem:",
                React.createElement("input", { type: "text", value: origin, onChange: (e) => setOrigin(e.target.value), required: true })),
            React.createElement("label", null,
                "Destino:",
                React.createElement("input", { type: "text", value: destination, onChange: (e) => setDestination(e.target.value), required: true })),
            React.createElement("button", { type: "submit" }, "Estimar Viagem")),
        response && (React.createElement("div", null,
            React.createElement("h2", null, "Estimativa da Viagem"),
            React.createElement("p", null,
                React.createElement("strong", null, "Origem:"),
                " ",
                response.origin),
            React.createElement("p", null,
                React.createElement("strong", null, "Destino:"),
                " ",
                response.destination),
            React.createElement("p", null,
                React.createElement("strong", null, "Dist\u00E2ncia:"),
                " ",
                response.distance),
            React.createElement("p", null,
                React.createElement("strong", null, "Dura\u00E7\u00E3o:"),
                " ",
                response.duration)))));
};
export default RideRequestForm;
