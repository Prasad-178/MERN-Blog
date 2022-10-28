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
exports.getUser = exports.verifyToken = exports.JWT_SECRET_KEY = void 0;
const User = require('../model/User');
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.JWT_SECRET_KEY = 'iloveprocrastinating';
var existingUser;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        existingUser = yield User.findOne({ email: email });
    }
    catch (err) {
        return (err);
    }
    if (!existingUser) {
        return res
            .status(400)
            .json({ message: "User does not exist. You should sign up instead." });
    }
    const passwordCompare = yield bcryptjs_1.default.compare(password, existingUser.password);
    if (!passwordCompare) {
        return res
            .status(400)
            .json({ message: "Password is wrong" });
    }
    const token = jsonwebtoken_1.default.sign({ id: existingUser._id }, exports.JWT_SECRET_KEY, {
        expiresIn: "28800000"
    });
    res.cookie(String(existingUser._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 3600 * 8),
        httpOnly: true,
        sameSite: 'lax'
    });
    return res
        .status(201)
        .json({ message: "Logged in successfully", user: existingUser, token });
});
const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    console.log("cookie is : ", cookies);
    const token = cookies && cookies.split('=')[1];
    console.log("token is : ", token);
    if (!token) {
        res
            .status(404)
            .json({ message: "No token found" });
    }
    jsonwebtoken_1.default.verify(token, exports.JWT_SECRET_KEY, (err, user = existingUser) => {
        if (err) {
            console.log("user is : ", existingUser);
            return res
                .status(400)
                .json({ "message": "Error, token cannot be verified" });
        }
        console.log("user id is : ", user.id);
        req.id = user.id;
    });
    next();
};
exports.verifyToken = verifyToken;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    let userDetails;
    try {
        userDetails = yield User.findById(userId, "-password");
    }
    catch (err) {
        return (err);
    }
    if (!userDetails) {
        return res
            .status(404)
            .json({ "message": "User not found" });
    }
    return res
        .status(200)
        .json({ userDetails });
});
exports.getUser = getUser;
exports.default = login;
