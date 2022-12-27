import Blog from "../../models/Blog";
import { Response } from "express";

const getAllPosts = async (req: any, res: Response) => {

    let blogs: any
    try {
        blogs = await Blog.find({}).exec()
    } catch (err) {
        console.log("get all blogs err is : ", err)
    }

    return res
    .status(200)
    .json({ blogs })
}

export default getAllPosts