import React, { useState } from "react";
import axios from "axios";

function RideEstimate () {
  //definindo os estados iniciais dos campos
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState<any[]>([]);
  const [error, setError] = useState("");




  return (
    <div>
    <h1>Oi</h1>
    </div>
  );
};

export default RideEstimate;
