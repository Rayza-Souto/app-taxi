import React, { useState } from "react";
import axios from "axios";

const RideEstimate = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => { // Função para lidar com o envio do formulário
    e.preventDefault();

    try {
      const response = await axios.get("http://localhost:8080/ride/estimate", { // Faz uma requisição GET para a rota /ride/estimate
        params: {
          origin,
          destination,
        },
      });

      setRoutes(response.data); // Salva os dados da resposta
      setError(""); // Limpa qualquer erro anterior
    } catch (error) {
      setError("Erro ao obter as rotas.");
      setRoutes([]);
    }
  };

  return (
    <div>
    <h1>Oi</h1>
    </div>
  );
};

export default RideEstimate;
