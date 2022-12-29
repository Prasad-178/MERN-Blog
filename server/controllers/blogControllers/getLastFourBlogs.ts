import Blog from "../../models/Blog";
import { Response } from "express";

const getLastFourPosts = async (req: any, res: Response) => {

    let blogs: any
    try {
        blogs = await Blog.find().sort({ _id: -1 }).limit(4)
    } catch (err) {
        console.log("get last four blogs err is : ", err)
    }

    return res
    .status(200)
    .json({ blogs })
}

export default getLastFourPosts