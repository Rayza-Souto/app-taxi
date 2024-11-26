const rides: any[] = [];

export const saveRide = (ride: any) => {
  rides.push({ id: rides.length + 1, ...ride });
};

export const getRides = (customer_id: string, driver_id?: number) => {
  return rides.filter(
    (ride) =>
      ride.customer_id === customer_id && (!driver_id || ride.driver.id === driver_id)
  );
};
