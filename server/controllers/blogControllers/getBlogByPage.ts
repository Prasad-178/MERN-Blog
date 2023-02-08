import { Request, Response } from "express";
import Blog from "../../models/Blog";

const getBlogByPage = async (req: Request, res: Response) => {

    const { pageNumber, pageSize } = req.body

    let blogs: any
    try {
        blogs = await Blog.find({}).limit(pageSize).skip((pageNumber-1)*pageSize)
    } catch (err) {
        // console.log(err)
    }

    return res
        .status(200)
        .json(blogs)

}

export default getBlogByPage