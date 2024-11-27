import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RideRequestForm from '../frontend/solicitacaoViagem';
import RideOptions from '../frontend/opcoesViagem';
import RideHistory from '../frontend/historicoViagens';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RideRequestForm />} />
        <Route path="/options" element={<RideOptions />} />
        <Route path="/history" element={<RideHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
