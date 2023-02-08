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
exports.verifyEmail = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    var existingUser;
    try {
        existingUser = yield User_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        // console.log(err)
    }
    if (existingUser.verified === true) {
        return res
            .status(400)
            .json({ message: "User's email is already verified!!" });
    }
    if (!existingUser) {
        // console.log("No such user exists!!")
        return res
            .status(404)
            .json({ message: "No such user exists!!" });
    }
    const passwordCompare = yield bcryptjs_1.default.compare(password, existingUser.password);
    if (!passwordCompare) {
        // console.log("Wrong password!!")
        return res
            .status(401)
            .json({ message: "Wrong password!!" });
    }
    existingUser.verified = true;
    try {
        yield existingUser.save();
    }
    catch (err) {
        // console.log(err)
    }
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "lummaoiscringe@gmail.com",
            pass: "xwhfjdhuduankjpc"
        }
    });
    let mailOptions = {
        from: "lummaoiscringe@gmail.com",
        to: email,
        subject: "Verified!!",
        text: "Congratulations!! Your blogify account has been verified!!",
    };
    transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
            // console.log("Mail not sent.", err)
        }
        else {
            // console.log("Success, email has been sent, and your account has been verified!!", success)
        }
    });
    return res
        .status(200)
        .json({ message: "Email verified!!" });
});
exports.verifyEmail = verifyEmail;
