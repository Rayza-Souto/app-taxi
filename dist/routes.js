import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RideOptions from './frontend/opcoesViagem';
import RideHistory from './frontend/historicoViagens';
import Home from './frontend/home';
const AppRotas = () => {
    return (React.createElement(Routes, null,
        React.createElement(Route, { path: "/", element: React.createElement(Home, null) }),
        React.createElement(Route, { path: "/ride/estimate", element: React.createElement(RideOptions, null) }),
        React.createElement(Route, { path: "/ride/:customer_id", element: React.createElement(RideHistory, null) })));
};
export default AppRotas;
