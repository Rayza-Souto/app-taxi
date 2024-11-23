import React, { useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

//interface LatLng {
 // lat: string;
 // lng: string;
//} 

function App() {

  useEffect(() => {
    axios.get("http://localhost:8080/ride/estimate").then((response) => {
      console.log(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Bem-vindo</h1>
      <Link to="/">Voltar para a página inicial</Link>
    </div>
  );
}

export default App;
