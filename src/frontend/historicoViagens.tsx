import React, { useState } from 'react';
import app from './services/api';

const RideHistory: React.FC = () => {
  const [customerId, setCustomerId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [rides, setRides] = useState<any[]>([]);

  const handleFetchHistory = async () => {
    try {
      const query = driverId ? `?driver_id=${driverId}` : '';
      const response = await app.get(`/ride/${customerId}${query}`);
      setRides(response.data.rides);
    } catch (error: any) {
      alert(error.response?.data?.error_description || 'Erro ao buscar o histórico.');
    }
  };

  return (
    <div>
      <h1>Histórico de Viagens</h1>
      <label>
        ID do Usuário:
        <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />
      </label>
      <label>
        ID do Motorista (opcional):
        <input type="text" value={driverId} onChange={(e) => setDriverId(e.target.value)} />
      </label>
      <button onClick={handleFetchHistory}>Buscar Histórico</button>
      <ul>
        {rides.map((ride) => (
          <li key={ride.id}>
            <p>Data: {ride.date}</p>
            <p>Motorista: {ride.driver.name}</p>
            <p>Origem: {ride.origin}</p>
            <p>Destino: {ride.destination}</p>
            <p>Distância: {ride.distance} km</p>
            <p>Tempo: {ride.duration}</p>
            <p>Valor: R$ {ride.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideHistory;

