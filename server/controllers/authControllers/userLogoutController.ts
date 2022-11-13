import { Request, Response, NextFunction } from "express";
import express from "express"
import cookieParser from "cookie-parser";

const app = express()
app.use(cookieParser())

const logout = (req: any, res: Response, next: NextFunction) => {
    console.log('hi')
    res.clearCookie('frontendCookie')
    res.clearCookie('JWT_HTTPONLY_Cookie')
    req.id = ""

    return res.redirect('/')
}

export default logout