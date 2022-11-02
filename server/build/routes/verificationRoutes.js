"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const userLoginController_1 = require("../controllers/userLoginController");
const app = (0, express_1.default)();
const verifiedRouter = express_1.default.Router();
verifiedRouter.get('/user', userLoginController_1.verifyToken, userLoginController_1.getUser);
verifiedRouter.get('*', (req, res) => {
    console.log("hi", path_1.default.join(__dirname, '..', '/client/build/index.html'));
    res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
});
exports.default = verifiedRouter;
