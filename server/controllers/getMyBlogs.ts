import Blog from "../models/Blog";
import User from "../models/User";
import { Response } from "express";

const getMyBlogs = async (req: any, res: Response) => {

    const email = req.email
    let blogs: any
    try {
        blogs = await Blog.find({ email: email }).exec()
    } catch (err) {
        console.log(err)
    }

    return res
    .status(200)
    .json( blogs )    

}

export default getMyBlogs