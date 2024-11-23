import React, { useState } from "react";
import { estimateRide } from "../../backend/controllers/controleDeRotas";

const EstimateRideComponent = () => {
  const [response, setResponse] = useState(null); // Estado para armazenar a resposta da API

  const handleEstimate = async () => {
    try {
      const result = await estimateRide(); // Chama a função e aguarda o retorno
      setResponse(result); // Armazena o resultado no estado
    } catch (error) {
      console.error("Erro ao estimar viagem:", error);
    }
  };

  return (
    <div>
      <h1>Estimativa de Viagem</h1>
      <input
        type="text"
        placeholder="ID do Cliente"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Origem"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destino"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleEstimate}>Calcular Estimativa</button>
      {response && (
        <div>
          <h2>Resultado:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EstimateRideComponent;
