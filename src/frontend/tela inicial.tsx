import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RideEstimate from './rotas';

function App() {
  console.log("oi")
    return (
      <div className="home">
        <h1 className="titulo">Taxi App</h1>
        <div className="search">
          <input
            type="text"
            placeholder="Digite algo..."
          />
          <Link to={'/RideEstimate'} className="btn btn-danger">Teste</Link>
        </div>
  
      </div>
  
    )
  }
  
  export default App;