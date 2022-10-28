import express from "express"
import path from "path"
import signup from "../controllers/userSignupController"
import login, { getUser } from "../controllers/userLoginController"
import { Request, Response } from "express"
import { verifyToken } from "../controllers/userLoginController"

const app = express()
const router = express.Router()

router.get('/', verifyToken, getUser)

router.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

router.post('/register', signup)
router.post('/login', login)

export default router
