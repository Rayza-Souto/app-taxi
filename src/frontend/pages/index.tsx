import React, { useState } from "react";
import axios from "axios";

const EstimateRide: React.FC = () => {
  const [form, setForm] = useState({
    customer_id: "",
    origin: "",
    destination: "",
  }); // Formulário para estimar viagem
  const [result, setResult] = useState<any>(null); // Resultado da estimativa

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }; // Atualiza o formulário

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/ride/estimate", form);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Erro ao estimar viagem!");
    }
  }; // Envia o formulário para estimar a viagem e atualiza o resultado

  return (
    <div>
      <h1>Estimar Viagem</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customer_id"
          placeholder="ID do Cliente"
          value={form.customer_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="origin"
          placeholder="Origem"
          value={form.origin}
          onChange={handleChange}
        />
        <input
          type="text"
          name="destination"
          placeholder="Destino"
          value={form.destination}
          onChange={handleChange}
        />
        <button type="submit">Estimar</button>
      </form>
      {result && (
        <div>
          <h2>Resultado</h2>
          <p>Distância: {result.distance} km</p>
          <p>Duração: {result.duration}</p>
          <h3>Motoristas Disponíveis:</h3>
          <ul>
            {result.options.map((driver: any) => (
              <li key={driver.id}>
                {driver.name} - R$ {driver.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}; // Componente para estimar viagem 

export default EstimateRide;
