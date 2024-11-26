const rides: any[] = [];

export const salvarCorrida = (ride: any) => { //salva a corrida no array
  rides.push({ id: rides.length + 1, ...ride });
};

export const verCorridas = (customer_id: string, driver_id?: number) => { //exibe as corridas salvas 
  return rides.filter(
    (ride) =>
      ride.customer_id === customer_id && (!driver_id || ride.driver.id === driver_id)
  );
}