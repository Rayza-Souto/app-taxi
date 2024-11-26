import React, { useState } from "react";
import axios from "axios";

function RideEstimate () {
  //definindo os estados iniciais dos campos
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState<any[]>([]);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => { // Função que será chamada quando o formulário for submetido
    e.preventDefault(); 

    try {
      const response = await axios.get("http://localhost:8080/ride/estimate", {
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
