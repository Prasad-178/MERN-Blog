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
const Otp_1 = __importDefault(require("../../models/Otp"));
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const setNewPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user;
    let otp;
    const { email, password, enteredOtp } = req.body;
    // console.log(enteredOtp)
    try {
        otp = yield Otp_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        // console.log(err)
    }
    // console.log(otp.otp)
    if (otp.otp !== enteredOtp) {
        return res
            .status(400)
            .json({ message: "Wrong otp entered!" });
    }
    try {
        user = yield User_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        // console.log(err)
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 5);
    user.password = hashedPassword;
    try {
        user.save();
    }
    catch (err) {
        // console.log(err)
    }
    try {
        otp = yield Otp_1.default.deleteOne({ email: email }).exec();
    }
    catch (err) {
        // console.log(err)
    }
    return res
        .status(200)
        .json(user);
});
exports.default = setNewPassword;
