import { Request, Response } from "express";
import Blog from "../../models/Blog";

const getBlogById = async (req: Request, res: Response) => {

    const id = req.params.id

    let blog: any
    try {
        blog = await Blog.findOne({ _id: id }).exec()
    } catch (err) {
        console.log(err)
    }

    return res
    .status(200)
    .json(blog)
}

export default getBlogById