import { Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    const cookies = req.headers.cookie
    const token = cookies && cookies.split('=')[1]
    console.log("cookie is : ", cookies)
    console.log("token is : ", token)
    
    if (!token) {
        console.log("No token!!")
        return res
        .status(404)
        .json({ message: "There is no token; you are not logged in!!" })
    }

    jwt.verify(token!, String(process.env.JWT_SECRET_KEY), (err: any, user: any) => {
        if (err) {
            console.log("error in verifying token!!")
            res
            .status(400)
            
            // alert("Token cannot be verified.")
        }

        console.log("user id is : ", user._id)
        req.id = user._id
    })
    next()
}