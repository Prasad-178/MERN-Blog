import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcryptjs"
import Blog from "../../models/Blog";

const editAccountDetails = async (req: Request, res: Response) => {

    const { name, email, password, newPassword } = req.body
    // console.log(name)

    let user: any
    try {
        user = await User.findOne({ email: email }).exec()
    } catch (err) {
        // console.log(err)
    }
    // console.log(user)

    if (name !== user.name) {
        // console.log("NEW NAME!!")

        user.name = name

        let blogs: any
        try {
            blogs = await Blog.find({ email: email }).exec()
        } catch (err) {
            // console.log(err)
        }

        for (let i=0; i<blogs.length; i++) {
            blogs[i].author = name
            try {
                blogs[i].save()
            } catch (err) {
                // console.log(err)
            }
        }
    }

    const passwordCompare = await bcrypt.compare(password, user.password)

    if (!passwordCompare && password.length > 0 && newPassword.length > 0) {
        // console.log("Password errors!")
        return res
            .status(400)
            .json({ message: "Current password is different from the one you entered!" })
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 5)
    if (newPassword) {
        user.password = hashedPassword
    }

    try {
        user.save()
    } catch (err) {
        // console.log(err)
    }

    return res
    .status(200)
    .json(user)

}

export default editAccountDetails