import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SolicitacaoViagens from "./solicitacaoViagem";
import OpcoesViagem from "./opcoesViagem";
import HistoricoViagens from "./historicoViagens";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SolicitacaoViagens />} />
        <Route path="/ride/estimate" element={<OpcoesViagem />} />
        <Route path= {"/ride/:customer_id"} element={<HistoricoViagens />} />
      </Routes>
    </Router>
  );
};

export default App;
