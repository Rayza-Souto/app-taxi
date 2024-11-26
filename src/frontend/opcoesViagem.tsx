import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import app from './services/api';

const RideOptions: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  if (!data) {
    return <p>Nenhuma informação disponível. Por favor, retorne à tela inicial.</p>;
  }

  const handleChooseDriver = async (driver: any) => {//função para escolher o motorista
    try {
      await app.patch('/ride/confirm', {
        customer_id: data.customer_id,
        origin: data.origin,
        destination: data.destination,
        distance: data.distance,
        duration: data.duration,
        driver: { id: driver.id, name: driver.name },
        value: driver.value,
      });
    } catch (error: any) {
      alert(error.response?.data?.error_description || 'Erro ao confirmar a viagem.');
    }
  };

  return (
    <div>
      <h1>Opções de Viagem</h1>
      <p>Origem: {data.origin.latitude}, {data.origin.longitude}</p>
      <p>Destino: {data.destination.latitude}, {data.destination.longitude}</p>
      <p>Distância: {data.distance} km</p>
      <p>Duração: {data.duration}</p>
      <h2>Motoristas Disponíveis</h2>
      <ul>
        {data.options.map((option: any) => (
          <li key={option.id}>
            <strong>{option.name}</strong> - {option.vehicle}
            <br />
            <em>{option.description}</em>
            <br />
            Valor: R${option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideOptions;
