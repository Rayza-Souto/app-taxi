import React from 'react';
import  {BrowserRouter, Routes, Route}  from 'react-router-dom';
import ReactDOM from "react-dom/client";
import RideRequestForm from '../frontend/solicitacaoViagem';
import RideOptions from '../frontend/opcoesViagem';
import RideHistory from '../frontend/historicoViagens';

const root = ReactDOM.createRoot(document.getElementById('root')!);
    root.render (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RideRequestForm />} />
                <Route path="/ride/estimate" element={<RideOptions />} />
                <Route path="/ride/:customer_id" element={<RideHistory />} />
            </Routes>
        </BrowserRouter>
    );
