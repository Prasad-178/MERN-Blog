export {}

import express from "express"
import signup from "../controllers/authControllers/userSignupController"
import login from "../controllers/authControllers/userLoginController"
import { verifyToken } from "../middleware/verifyJWTLogin"
import { verifyEmail } from "../controllers/authControllers/VerifyEmail"
import userDetails from "../controllers/userDetails"
import logout from "../controllers/authControllers/userLogoutController"

const router = express.Router()

router.post('/register', signup)
router.post('/login', login)
router.post('/verifyemail', verifyEmail)

router.use(verifyToken)

router.get('/get', userDetails)
router.get('/logout', logout)
router.get('/checkemailverification')

export default router
