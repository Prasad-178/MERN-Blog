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
exports.singleFileUpload = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const singleFileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("inside single file upload")
    try {
        const file = req.file;
        return res.
            status(201)
            .send('File uploaded successfully!');
    }
    catch (err) {
        return res
            .status(400)
            .send(err.message);
    }
});
exports.singleFileUpload = singleFileUpload;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { author, title, content, twitter, instagram, tags, image, email } = req.body;
    let date = new Date(Date.now());
    date.toDateString();
    date = String(date).split("GMT")[0];
    // 
    // console.log("c is : ", content)
    // console.log("c len is : ", content.length)
    if (!author || !title || content.length < 1 || content.length === 8 || !twitter || !instagram || tags.length < 1 || !image || !email) {
        return res
            .status(400)
            .json({ message: "Failed to create blog" });
    }
    const blog = new Blog_1.default({
        author: author,
        title: title,
        content: content,
        image: image,
        date: date,
        tags: tags,
        twitter: twitter,
        instagram: instagram,
        email: email
    });
    try {
        yield blog.save();
    }
    catch (err) {
        // console.log(err)
    }
    return res
        .status(201)
        .json({ message: blog });
});
exports.default = createBlog;
