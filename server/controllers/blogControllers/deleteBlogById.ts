import { Response } from "express";
import Blog from "../../models/Blog";

const deleteBlog = async (req: any, res: Response) =>  {
    
    const id = req.params.id

    let blog: any
    try {
        blog = await Blog.findByIdAndDelete({ _id: id }).exec()
    } catch (err) {
        // console.log(err)
    }

    return res.redirect('/myposts')
}

export default deleteBlog