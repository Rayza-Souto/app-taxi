import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RideRequestForm from '../frontend/solicitacaoViagem';
import RideOptions from '../frontend/opcoesViagem';
import RideHistory from '../frontend/historicoViagens';
const App = () => {
    return (React.createElement(Router, null,
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/", element: React.createElement(RideRequestForm, null) }),
            React.createElement(Route, { path: "/options", element: React.createElement(RideOptions, null) }),
            React.createElement(Route, { path: "/history", element: React.createElement(RideHistory, null) }))));
};
export default App;
