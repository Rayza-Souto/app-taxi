import React, { useState } from "react";
import api from "./services/api";

const HistoricoViagens: React.FC = () => {
    const [customerId, setCustomerId] = useState("");
    const [rides, setRides] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    const handleFetchHistory = async () => {
      try {
        const response = await api.get(`/ride/${customerId}`);
        setRides(response.data.rides);
      } catch (err: any) {
        setError(err.response?.data?.error_description || "Erro ao buscar o histórico.");
      }
    };
  
    return (
      <div>
        <h1>Histórico de Viagens</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label>ID do Usuário:</label>
          <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
          <button onClick={handleFetchHistory}>Buscar</button>
        </div>
        <ul>
          {rides.map((ride) => (
            <li key={ride.id}>
              <p>Data: {new Date(ride.date).toLocaleString()}</p>
              <p>Motorista: {ride.driver.name}</p>
              <p>Origem: {ride.origin}</p>
              <p>Destino: {ride.destination}</p>
              <p>Distância: {ride.distance} km</p>
              <p>Valor: R$ {ride.value.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default HistoricoViagens;