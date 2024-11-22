import React, { useState } from 'react';
import axios from 'axios';

const ConfRide: React.FC = () => {
  const [rideId, setRideId] = useState('');

  const handleConfirm = async () => {
    try {
      const res = await axios.patch('http://localhost:8080/ride/confirm', {
        customer_id: '123',
        origin: 'Origin Address',
        destination: 'Destination Address',
        driver: { id: 1, name: 'Homer Simpson' },
        distance: 10,
        value: 25.0,
      });
      console.log('Ride confirmed:', res.data);
    } catch (error) {
      console.error('Error confirming ride:', error);
    }
  };

  return (
    <div>
      <h1>Confirm Ride</h1>
      <input
        type="text"
        placeholder="Ride ID"
        value={rideId}
        onChange={(e) => setRideId(e.target.value)}
      />
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default ConfRide;
