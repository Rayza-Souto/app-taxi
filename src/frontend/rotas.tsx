import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OpcoesViagem from "./opcoesViagem";
import HistoricoViagens from "./historicoViagens";
import Inicio from "./inicio";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/ride/estimate" element={<OpcoesViagem />} />
        <Route path= {"/ride/:customer_id"} element={<HistoricoViagens />} />
      </Routes>
    </Router>
  );
};

export default App;
