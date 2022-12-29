import Blog from "../../models/Blog";
import { Response } from "express";

const getAllPosts = async (req: any, res: Response) => {

    let blogs: any
    try {
        blogs = await Blog.find({}).exec() // code to find all documents
        // blogs = await Blog.find().sort({ _id: -1 }).limit(1) => // => code to find the latest document...
    } catch (err) {
        console.log("get all blogs err is : ", err)
    }

    return res
    .status(200)
    .json({ blogs })
}

export default getAllPosts