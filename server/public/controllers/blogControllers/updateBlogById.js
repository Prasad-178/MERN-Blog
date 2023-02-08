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
const updateBlogById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let blog;
    try {
        blog = yield Blog_1.default.findOne({ _id: id }).exec();
    }
    catch (err) {
        // console.log(err)
    }
    const { author, title, content, twitter, instagram, tags, image, email } = req.body;
    let date = new Date(Date.now());
    date.toDateString();
    date = String(date).split("GMT")[0];
    var k = 0;
    if (content.length === 8) {
        k = 1;
    }
    if (author)
        blog.author = author;
    if (title)
        blog.title = title;
    if (email)
        blog.email = email;
    if (k === 0) {
        blog.content = content;
    }
    else {
        blog.content = blog.content;
    }
    if (twitter)
        blog.twitter = twitter;
    if (instagram)
        blog.instagram = instagram;
    if (tags)
        blog.tags = tags;
    if (image)
        blog.image = image;
    blog.date = date;
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
exports.default = updateBlogById;
