import { Request, Response } from "express";
import Blog from "../../models/Blog";
import User from "../../models/User";

const getBlogByAuthor = async (req: Request, res: Response) => {

    const author = req.params.author

    let blogs: any
    try {
        blogs = await Blog.find({ author: author }).exec()
    } catch (err) {
        // console.log(err)
    }

    // console.log(blogs)

    let user: any
    try {
        user = await User.findOne({ name: author }).exec()
    } catch (err) {
        // console.log(err)
    }

    // console.log(user)

    return res
        .status(200)
        .json({ blogs: blogs, user: user })

}

export default getBlogByAuthor