export {}
import mongoose from "mongoose"

const Schema = mongoose.Schema
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
})

export default mongoose.model('Blog', blogSchema)