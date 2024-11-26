import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // URL da API
});

const OpcoesViagem: React.FC = () => {
  const [estimate, setEstimate] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("estimate");
    if (data) {
      setEstimate(JSON.parse(data));
    } else {
      navigate("/");
    }
  }, [navigate]);

  const handleChooseDriver = async (driver: any) => {
    try {
      const response = await api.patch("/ride/confirm", {
        customer_id: estimate.customer_id,
        origin: estimate.origin,
        destination: estimate.destination,
        distance: estimate.distance,
        duration: estimate.duration,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        value: driver.value,
      });
      if (response.data.success) {
        navigate("/history");
      }
    } catch (err: any) {
      setError(err.response?.data?.error_description || "Erro ao confirmar a viagem.");
    }
  };

  return (
    <div>
      <h1>Opções de Viagem</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {estimate && (
        <>
          <h2>Rota</h2>
          <p>
            Origem: {estimate.origin.latitude}, {estimate.origin.longitude} <br />
            Destino: {estimate.destination.latitude}, {estimate.destination.longitude}
          </p>
          <p>Distância: {estimate.distance} km</p>
          <p>Duração: {estimate.duration}</p>

          <h2>Motoristas Disponíveis</h2>
          <ul>
            {estimate.options.map((driver: any) => (
              <li key={driver.id}>
                <p>{driver.name} - {driver.vehicle} ({driver.review.rating}/5)</p>
                <p>{driver.description}</p>
                <p>R$ {driver.value.toFixed(2)}</p>
                <button onClick={() => handleChooseDriver(driver)}>Escolher</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default OpcoesViagem;