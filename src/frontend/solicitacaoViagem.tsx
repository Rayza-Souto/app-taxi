import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/api'; // Importando o serviço de API

const RideRequestForm: React.FC = () => {
    const [customerId, setCustomerId] = useState('');
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [response, setResponse] = useState<any>(null); // Para exibir a resposta
    const navigate = useNavigate();

    // Função para enviar os dados para o backend
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const res = await api.get('/ride/estimate', {
                params: {
                    origin,
                    destination,
                },
            });

            setResponse(res.data); // Salva a resposta para exibição
            console.log('Resposta da API:', res.data);
        } catch (error) {
            console.error('Erro ao estimar viagem:', error);
            alert('Erro ao estimar viagem. Verifique os parâmetros e tente novamente.');
        }
    };

    return (
        <div>
            <h1>Solicitar Viagem</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    ID do Usuário:
                    <input
                        type="text"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Origem:
                    <input
                        type="text"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Destino:
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Estimar Viagem</button>
            </form>

            {/* Exibe a resposta da API */}
            {response && (
                <div>
                    <h2>Estimativa da Viagem</h2>
                    <p><strong>Origem:</strong> {response.origin}</p>
                    <p><strong>Destino:</strong> {response.destination}</p>
                    <p><strong>Distância:</strong> {response.distance}</p>
                    <p><strong>Duração:</strong> {response.duration}</p>
                </div>
            )}
        </div>
    );
};

export default RideRequestForm;
