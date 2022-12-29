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
const nodemailer_1 = __importDefault(require("nodemailer"));
const html = `
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}></div>
    <h1>Welcome to Blogify</h1>
    <p>Kindly verify your blogify account email by clicking the link below : </p>
    <button> <a href="http://localhost:3000/accountVerification"> Verify Email </a> </button>
`;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = yield User_1.default.findOne({ email: email });
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
    const user = new User_1.default({
        name,
        email,
        password: hashedPassword,
        verified: false
    });
    try {
        yield user.save();
    }
    catch (err) {
        console.log(err);
    }
    let transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: "blogify253@gmail.com",
            pass: "oshjipijfcacciyx"
        }
    });
    let mailOptions = {
        from: "blogify253@gmail.com",
        to: email,
        subject: "Verify your Blogify Account Email",
        html: html
    };
    transporter.sendMail(mailOptions, (err, success) => {
        if (err) {
            console.log("Mail not sent.", err);
        }
        else {
            console.log("Success, email has been sent.", success);
        }
    });
    return res
        .status(201)
        .json({ message: user });
});
exports.default = signup;
