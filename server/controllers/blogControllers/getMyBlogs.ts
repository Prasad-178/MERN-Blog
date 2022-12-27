import Blog from "../../models/Blog";
import User from "../../models/User";
import { Response } from "express";

const getMyBlogs = async (req: any, res: Response) => {

    // let email: any
    // const cookies = req.headers.cookie
    // const token = cookies && cookies.split('=')[1]

    // if (!token) {
    //     return res
    //     .status(404)
    //     .json({ status: false })
    // }

    // jwt.verify(token!, String(process.env.JWT_SECRET_KEY), (err: any, user: any) => {
    //     if (err) {
    //         console.log("error in verifying token!!")
    //         res
    //         .status(400)
    //         .json({ status: false, token: "Cannot verify token!" })
    //     }

    //     let currentUser: any
    //     try {
    //         User.findOne({ _id: user.id }).exec().then((data) => {
    //             currentUser = data
    //             // console.log("inside curUser is : ", data)
    //             email = data?.email
    //         })
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     // console.log("user is : ", user)
    //     // console.log("curUser is : ", currentUser)

    //     // req.email = currentUser.email
    // })

    const { email } = req.body

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