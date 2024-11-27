const rides = [];
export const salvarCorrida = (ride) => {
    rides.push(Object.assign({ id: rides.length + 1 }, ride));
};
export const verCorridas = (customer_id, driver_id) => {
    return rides.filter((ride) => ride.customer_id === customer_id && (!driver_id || ride.driver.id === driver_id));
};
