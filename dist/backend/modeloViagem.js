"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verCorridas = exports.salvarCorrida = void 0;
const rides = [];
const salvarCorrida = (ride) => {
    rides.push(Object.assign({ id: rides.length + 1 }, ride));
};
exports.salvarCorrida = salvarCorrida;
const verCorridas = (customer_id, driver_id) => {
    return rides.filter((ride) => ride.customer_id === customer_id && (!driver_id || ride.driver.id === driver_id));
};
exports.verCorridas = verCorridas;
