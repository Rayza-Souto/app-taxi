import React from 'react';
import  {BrowserRouter, Routes, Route}  from 'react-router-dom';
import ReactDOM from "react-dom/client";
import RideRequestForm from './frontend/solicitacaoViagem';
import RideOptions from './frontend/opcoesViagem';
import RideHistory from './frontend/historicoViagens';
import Home from './frontend/home';

const AppRotas: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ride/estimate" element={<RideOptions />} />
            <Route path="/ride/:customer_id" element={<RideHistory />} />
        </Routes>
    );
};

export default AppRotas;