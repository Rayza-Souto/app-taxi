import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import AppRotas from './routes'
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();
const port = 8080;

//app.use(express.json());
app.use(express.static(path.join(__dirname, 'index.html')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <AppRotas />  {/* Aqui você chama o componente AppRoutes que contém as rotas */}
        </BrowserRouter>
    );
};

export default App;