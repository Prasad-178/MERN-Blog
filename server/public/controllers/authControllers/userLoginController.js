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
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    var existingUser;
    try {
        existingUser = yield User_1.default.findOne({ email: email });
    }
    catch (err) {
        return (err);
    }
    if (!existingUser) {
        return res
            .status(404)
            .json({ message: "User does not exist. You should sign up instead." });
    }
    const passwordCompare = yield bcryptjs_1.default.compare(password, existingUser.password);
    if (!passwordCompare) {
        return res
            .status(400)
            .json({ message: "Password is wrong" });
    }
    const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, String(process.env.JWT_SECRET_KEY), {
        expiresIn: "3h"
    });
    res.cookie('JWT_HTTPONLY_Cookie', token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
        httpOnly: true,
        sameSite: 'lax'
    });
    console.log("Logged in successfully!!");
    return res
        .status(201)
        .json({ message: "Logged in successfully", user: existingUser, token });
});
exports.default = login;
