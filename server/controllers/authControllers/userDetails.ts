import { Response } from "express";
import User from "../../models/User";
import jwt from "jsonwebtoken"

const userDetails = async (req: any, res: Response) => {

    let userDetails: any
    const cookies = req.headers.cookie
    // console.log(cookies)
    const token = req.cookies.JWT_HTTPONLY_Cookie
    // console.log(newcookie)
    // const jwttoken = cookies && cookies.split(';')[0]
    // console.log(jwttoken)
    // const token = jwttoken && jwttoken.split('=')[1]

    if (!token) {
        return res
        .status(404)
        .json({ status: false })
    }

    jwt.verify(token!, String(process.env.JWT_SECRET_KEY), async (err: any, user: any) => {
        if (err) {
            // console.log("error in verifying token!!")
            res
            .status(400)
            .json({ status: false, token: "Cannot verify token!" })
        }

        let currentUser: any
        // console.log(user)
        try {
            currentUser = await User.findOne({ _id: user.id }).exec()
            // console.log(currentUser)
        } catch (err) {
            // console.log(err)
        }

        return res
        .status(200)
        .json(currentUser)
    })
    
}

export default userDetails