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
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     upload.single("blogImage")
    // } catch (err) {
    //     console.log(err)
    // }
    // console.log("image uploaded successfully!")
    const { author, title, content, twitter, instagram, tags, image } = req.body;
    let date = new Date(Date.now());
    date.toDateString();
    date = String(date).split("GMT")[0];
    const blog = new Blog_1.default({
        author: author,
        title: title,
        content: content,
        image: image,
        date: date,
        tags: tags,
        twitter: twitter,
        instagram: instagram
    });
    try {
        yield blog.save();
    }
    catch (err) {
        console.log(err);
    }
    return res
        .status(201)
        .json({ message: blog });
});
exports.default = createBlog;
