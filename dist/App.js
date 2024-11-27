"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const routes_1 = __importDefault(require("./routes"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8080;
//app.use(express.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'index.html')));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
            <routes_1.default />  {/* Aqui você chama o componente AppRoutes que contém as rotas */}
        </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
