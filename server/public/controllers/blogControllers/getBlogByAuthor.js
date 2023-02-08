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
const Blog_1 = __importDefault(require("../../models/Blog"));
const User_1 = __importDefault(require("../../models/User"));
const getBlogByAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const author = req.params.author;
    let blogs;
    try {
        blogs = yield Blog_1.default.find({ author: author }).exec();
    }
    catch (err) {
        // console.log(err)
    }
    // console.log(blogs)
    let user;
    try {
        user = yield User_1.default.findOne({ name: author }).exec();
    }
    catch (err) {
        // console.log(err)
    }
    // console.log(user)
    return res
        .status(200)
        .json({ blogs: blogs, user: user });
});
exports.default = getBlogByAuthor;
