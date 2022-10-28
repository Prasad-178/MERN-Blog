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
const User = require('../model/User');
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hi");
    const { name, email, password } = req.body;
    console.log(name, email, password);
    let existingUser;
    try {
        existingUser = yield User.findOne({ email: email });
    }
    catch (err) {
        console.log(err);
    }
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User already exists! Login instead." });
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 5);
    const user = new User({
        name,
        email,
        password: hashedPassword
    });
    try {
        yield user.save();
    }
    catch (err) {
        console.log(err);
    }
    return res
        .status(201)
        .json({ message: user });
});
exports.default = signup;
