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
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    tags: [{
            type: String,
            required: true
        }],
    twitter: {
        type: String,
        required: true
    },
    instagram: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('Blog', blogSchema);
