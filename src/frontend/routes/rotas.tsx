import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import App from '../pages/App';
import EstRide from '../components/EstRide';
import ConfRide from '../components/ConfRide';
import express from 'express';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

//root.render(
 // <BrowserRouter>
   // <Routes>
   // 
   //   <Route path="/ride/estimate" element={<EstRide />} />
   //   <Route path="/ride/confirm" element={<ConfRide />} />
   // </Routes>
//  </BrowserRouter>
//);