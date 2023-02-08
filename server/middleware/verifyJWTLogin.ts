import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
    const cookies = req.headers.cookie
    const token = req.cookies.JWT_HTTPONLY_Cookie
    
    if (!token) {
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
        // console.log(user)
        try {
            User.findOne({ _id: user.id }).exec().then((data) => {
                currentUser = data
            })
        } catch (err) {
            // console.log(err)
        }
    })
    next()
}