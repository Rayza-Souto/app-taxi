import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import app from './services/api';

const RideRequestForm: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => { //função para enviar a solicitação de viagem
    e.preventDefault();
    try {
      const response = await app.post('/ride/estimate', { customer_id: customerId, origin, destination });
      navigate('/options', { state: { data: response.data } });
    } catch (error: any) {
      alert(error.response?.data?.error_description || 'Erro ao estimar a viagem.');
    }
  };

  return (
    <div>
      <h1>Solicitar Viagem</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID do Usuário:
          <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
        </label>
        <label>
          Origem:
          <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
        </label>
        <label>
          Destino:
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        </label>
        <button type="submit">Estimar Viagem</button>
      </form>
    </div>
  );
};

export default RideRequestForm;
