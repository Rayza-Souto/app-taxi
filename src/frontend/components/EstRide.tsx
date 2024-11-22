import React, { useState } from 'react';
import axios from 'axios';

const EstRide: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [response, setResponse] = useState(null);

  const handleEstimate = async () => {
    try {
      const res = await axios.post('http://localhost:8080/ride/estimate', {
        customer_id: '123',
        origin,
        destination,
      });
      setResponse(res.data);
    } catch (error) {
      console.error('Error estimating ride:', error);
    }
  };

  return (
    <div>
      <h1>Estimate Ride</h1>
      <input
        type="text"
        placeholder="Origin"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleEstimate}>Estimate</button>

      {response && (
        <div>
          <h2>Estimated Ride:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EstRide;
