"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRoute = void 0;
const axios_1 = __importDefault(require("axios"));
const calculateRoute = (origin, destination) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const apiKey = process.env.GOOGLE_API_KEY;
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;
    const response = yield axios_1.default.post(url, {
        origin: { location: { address: origin } },
        destination: { location: { address: destination } },
        travelMode: "DRIVE",
    }, { headers: { Authorization: `Bearer ${apiKey}` } });
    const data = response.data;
    const distance = ((_b = (_a = data.routes[0]) === null || _a === void 0 ? void 0 : _a.legs[0]) === null || _b === void 0 ? void 0 : _b.distanceMeters) / 1000; // km
    const duration = (_d = (_c = data.routes[0]) === null || _c === void 0 ? void 0 : _c.legs[0]) === null || _d === void 0 ? void 0 : _d.duration;
    return { distance, duration, fullResponse: data };
});
exports.calculateRoute = calculateRoute;
exports.default = exports.calculateRoute;
