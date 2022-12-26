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
const Blog_1 = __importDefault(require("../models/Blog"));
const getMyBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // let email: any
    // const cookies = req.headers.cookie
    // const token = cookies && cookies.split('=')[1]
    // if (!token) {
    //     return res
    //     .status(404)
    //     .json({ status: false })
    // }
    // jwt.verify(token!, String(process.env.JWT_SECRET_KEY), (err: any, user: any) => {
    //     if (err) {
    //         console.log("error in verifying token!!")
    //         res
    //         .status(400)
    //         .json({ status: false, token: "Cannot verify token!" })
    //     }
    //     let currentUser: any
    //     try {
    //         User.findOne({ _id: user.id }).exec().then((data) => {
    //             currentUser = data
    //             // console.log("inside curUser is : ", data)
    //             email = data?.email
    //         })
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     // console.log("user is : ", user)
    //     // console.log("curUser is : ", currentUser)
    //     // req.email = currentUser.email
    // })
    const { email } = req.body;
    // console.log("req is : ", req)
    console.log("req email is : ", email);
    let blogs;
    try {
        blogs = yield Blog_1.default.find({ email: email }).exec();
    }
    catch (err) {
        console.log(err);
    }
    return res
        .status(200)
        .json(blogs);
});
exports.default = getMyBlogs;
