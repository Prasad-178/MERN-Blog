import { Request, Response } from "express";
import Blog from "../../models/Blog";

const totalNumberOfBlogs = async (req: Request, res: Response) => {

    let num: Number = 0
    try {
        num = await Blog.countDocuments({}).exec()
    } catch (err) {
        // console.log(err)
    }

    return res
        .status(200)
        .json({ count: num })

}

export default totalNumberOfBlogs