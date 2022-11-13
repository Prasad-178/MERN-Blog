"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies && cookies.split('=')[1];
    console.log("cookie is : ", cookies);
    console.log("token is : ", token);
    if (!token) {
        console.log("No token!!");
        return res
            .status(404)
            .json({ message: "There is no token; you are not logged in!!" });
    }
    jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET_KEY), (err, user) => {
        if (err) {
            console.log("error in verifying token!!");
            res
                .status(400);
            // alert("Token cannot be verified.")
        }
        console.log("user id is : ", user._id);
        req.id = user._id;
    });
    next();
};
exports.verifyToken = verifyToken;
