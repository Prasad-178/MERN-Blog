import express from "express"
import path from "path"
import signup from "../controllers/authControllers/userSignupController"
import login, { getUser } from "../controllers/authControllers/userLoginController"
import { verifyToken } from "../middleware/verifyJWTLogin"
import { verifyEmail } from "../controllers/authControllers/VerifyEmail"
import logout from "../controllers/authControllers/userLogoutController"

const app = express()
const router = express.Router()

router.post('/register', signup)
router.post('/login', login)
router.post('/verifyemail', verifyEmail)

router.use(verifyToken)

router.get('/logout', logout)
router.get('/checkEmailVerification')


export default router