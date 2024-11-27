import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import app from './services/api';

const RideOptions: React.FC = () => {
  const location = useLocation(); //pega a localização atual
  const navigate = useNavigate(); //navega para outra rota
  const data = location.state?.data; //pega os dados da localização atual

  if (!data) {
    return <p>Nenhuma informação disponível. Por favor, retorne à tela inicial.</p>;
  }

  const handleChooseDriver = async (driver: any) => {//função para escolher o motorista
    try {
      await app.patch('/ride/confirm', { //envia uma requisição PATCH para a rota /ride/confirm
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
            Valor: R${option.value.toFixed(2)}
            <br />
            <button onClick={() => handleChooseDriver(option)}>Escolher</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RideOptions;

