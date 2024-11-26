import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RideEstimate from './rotas';

function App() {

    // Definindo um estado para armazenar o valor da caixa de texto
    const [valor, setValor] = useState('');
  
    // Função para lidar com a mudança no valor da caixa de texto
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setValor(event.target.value); // Atualiza o estado com o valor da caixa de texto
    };
  
    const handleKeyDown = (e: { key: string; }) => {
      if (e.key === "Enter") {
        <Link to={'/ '}></Link>
      }
    };
  
    return (
      <div className="home">
        <h1 className="titulo">Taxi App</h1>
        <div className="search">
          <input
            type="text"
            value={valor}
            onChange={handleChange}
            placeholder="Digite algo..."
          />
          <Link to={'/RideEstimate'} className="btn btn-danger">Teste</Link>
        </div>
  
      </div>
  
    )
  }
  
  export default App;