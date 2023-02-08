import { Response } from "express";
import jwt from "jsonwebtoken"
import User from "../models/User";

const checkemailverification = async (req: any, res: Response) => {

    const cookies = req.headers.cookie
    const token = req.cookies.JWT_HTTPONLY_Cookie
    
    if (!token) {
        // console.log("No token!!")
        return res
        .status(400)
        .json({ status: false })
    }

    jwt.verify(token!, String(process.env.JWT_SECRET_KEY), (err: any, user: any) => {
        if (err) {
            // console.log("error in verifying token!!")
            res
            .status(400)
            .json({ status: false, token: "Cannot verify token!" })
        }

        let currentUser: any
        try {
            User.findOne({ _id: user.id }).exec().then((data) => {
                currentUser = data
                // console.log("inside curUser is : ", data)
                if (data?.verified == true) {
                    return res
                    .status(200)
                    .json({ message: true })
                }
                else {
                    return res
                    .status(400)
                    .json({ message: false })
                }
            })
        } catch (err) {
            // console.log(err)
        }

    })
}

export default checkemailverification