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
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { author, title, content, tags, twitter } = req.body;
    // const Storage = multer.diskStorage({
    //     // destination: 'uploads',
    //     destination: function (req, file, callback) {
    //         callback(null, '../uploads')
    //     },
    //     filename: (req, file, cb) => {
    //         cb(null, Date.now() + file.originalname)
    //     }
    // })
    // const upload = multer({
    //     storage: Storage,
    //     limits: {
    //         fieldSize: 1024 * 1024 * 3
    //     }
    // })
    // .single("testImage")
    const date = new Date();
    const blog = new Blog_1.default({
        author: author,
        title: title,
        content: content,
        // images: {
        //     contentType: 'image/png',
        //     data: req.file?.filename
        // },
        date: date,
        tags: tags,
        twitter: twitter
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
