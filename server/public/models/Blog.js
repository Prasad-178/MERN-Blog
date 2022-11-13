"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const blogSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: {
        contentType: String,
        data: Buffer
    },
    date: {
        type: Date,
        required: false
    },
    tags: [{
            type: String,
            required: false
        }],
    twitter: [{
            type: String,
            required: false
        }]
});
exports.default = mongoose_1.default.model('Blog', blogSchema);
// module.exports = mongoose.model('Blog', blogSchema)
