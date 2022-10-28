import express from "express"
import path from "path"
import signup from "../controllers/userSignupController"
import login, { getUser } from "../controllers/userLoginController"
import { Request, Response } from "express"
import { verifyToken } from "../controllers/userLoginController"

const app = express()
const verifiedRouter = express.Router()

verifiedRouter.get('/', verifyToken, getUser)

verifiedRouter.get('*', (req: Request, res: Response) => {
    console.log("hi", path.join(__dirname, '..', '/client/build/index.html'))
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

// verifiedRouter.post('/register', signup)
// verifiedRouter.post('/login', login)

export default verifiedRouter
