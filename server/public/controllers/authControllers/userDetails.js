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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let userDetails;
    const cookies = req.headers.cookie;
    // console.log(cookies)
    const token = req.cookies.JWT_HTTPONLY_Cookie;
    // console.log(newcookie)
    // const jwttoken = cookies && cookies.split(';')[0]
    // console.log(jwttoken)
    // const token = jwttoken && jwttoken.split('=')[1]
    if (!token) {
        return res
            .status(404)
            .json({ status: false });
    }
    jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET_KEY), (err, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            // console.log("error in verifying token!!")
            res
                .status(400)
                .json({ status: false, token: "Cannot verify token!" });
        }
        let currentUser;
        // console.log(user)
        try {
            currentUser = yield User_1.default.findOne({ _id: user.id }).exec();
            // console.log(currentUser)
        }
        catch (err) {
            // console.log(err)
        }
        return res
            .status(200)
            .json(currentUser);
    }));
});
exports.default = userDetails;
