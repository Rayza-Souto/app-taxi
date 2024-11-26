import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./services/api";

export const SolicitacaoViagens: React.FC = () => {
  const [customerId, setCustomerId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Navegação entre páginas

  const handleEstimate = async () => { // Função para estimar a viagem
    try { //tratativa de erro
      if (!customerId || !origin || !destination) {
        setError("Todos os campos são obrigatórios!");
        return;
      }

      const response = await api.post("/ride/estimate", { //faz a requisição para a API
        customer_id: customerId,
        origin,
        destination,
      });

      // Armazenar dados no localStorage para a próxima página
      
      localStorage.setItem("estimate", JSON.stringify(response.data));
      navigate("/ride/estimate"); // Redireciona para a página de opções
    } catch (err: any) {
      setError(err.response?.data?.error_description || "Erro ao estimar a viagem.");
    }
  };

  return (
    <div>
      <h1>Solicitação de Viagem</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <div>
          <label>ID do Usuário:</label>
          <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
        </div>
        <div>
          <label>Origem:</label>
          <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
        </div>
        <div>
          <label>Destino:</label>
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </div>
        <button type="button" onClick={handleEstimate}>
          Estimar Viagem
        </button>
      </form>
    </div>
  );
};

export default SolicitacaoViagens;
