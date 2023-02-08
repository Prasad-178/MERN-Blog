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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const checkemailverification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = req.headers.cookie;
    const token = req.cookies.JWT_HTTPONLY_Cookie;
    if (!token) {
        // console.log("No token!!")
        return res
            .status(400)
            .json({ status: false });
    }
    jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET_KEY), (err, user) => {
        if (err) {
            // console.log("error in verifying token!!")
            res
                .status(400)
                .json({ status: false, token: "Cannot verify token!" });
        }
        let currentUser;
        try {
            User_1.default.findOne({ _id: user.id }).exec().then((data) => {
                currentUser = data;
                // console.log("inside curUser is : ", data)
                if ((data === null || data === void 0 ? void 0 : data.verified) == true) {
                    return res
                        .status(200)
                        .json({ message: true });
                }
                else {
                    return res
                        .status(400)
                        .json({ message: false });
                }
            });
        }
        catch (err) {
            // console.log(err)
        }
    });
});
exports.default = checkemailverification;
