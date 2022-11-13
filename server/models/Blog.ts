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
})

export default mongoose.model('Blog', blogSchema)
// module.exports = mongoose.model('Blog', blogSchema)