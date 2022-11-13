"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const logout = (req, res, next) => {
    console.log('hi');
    res.clearCookie('frontendCookie');
    res.clearCookie('JWT_HTTPONLY_Cookie');
    req.id = "";
    return res.redirect('/');
};
exports.default = logout;
