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
const Blog_1 = __importDefault(require("../../models/Blog"));
const editAccountDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, newPassword } = req.body;
    console.log(name);
    let user;
    try {
        user = yield User_1.default.findOne({ email: email }).exec();
    }
    catch (err) {
        console.log(err);
    }
    console.log(user);
    if (name !== user.name) {
        console.log("NEW NAME!!");
        user.name = name;
        let blogs;
        try {
            blogs = yield Blog_1.default.find({ email: email }).exec();
        }
        catch (err) {
            console.log(err);
        }
        for (let i = 0; i < blogs.length; i++) {
            blogs[i].author = name;
            try {
                blogs[i].save();
            }
            catch (err) {
                console.log(err);
            }
        }
    }
    const passwordCompare = yield bcryptjs_1.default.compare(password, user.password);
    if (!passwordCompare && password.length > 0 && newPassword.length > 0) {
        console.log("Password errors!");
        return res
            .status(400)
            .json({ message: "Current password is different from the one you entered!" });
    }
    const hashedPassword = bcryptjs_1.default.hashSync(newPassword, 5);
    if (newPassword) {
        user.password = hashedPassword;
    }
    try {
        user.save();
    }
    catch (err) {
        console.log(err);
    }
    return res
        .status(200)
        .json(user);
});
exports.default = editAccountDetails;
