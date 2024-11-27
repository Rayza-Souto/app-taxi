"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var react_google_maps_1 = require("@vis.gl/react-google-maps");
var App = function () { return (<react_google_maps_1.APIProvider apiKey={process.env.GOOGLE_API_KEY || ''} onLoad={function () { return console.log('Maps API has loaded.'); }}>
   <h1>Hello, world!</h1>
 </react_google_maps_1.APIProvider>); };
var container = document.getElementById('app');
if (container) {
    var root = (0, client_1.createRoot)(container);
    root.render(<App />);
}
exports.default = App;
