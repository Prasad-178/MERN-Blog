import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import router from "./routes/verificationRoutes"
import { Request, Response } from "express"
import cookieParser from "cookie-parser"
import path from "path"
import signup from "./controllers/userSignupController"
import login from "./controllers/userLoginController"

const app = express()

// mounting middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.json())
app.use('/verified', router)
app.use(express.static(path.join(__dirname, '..', 'client', 'build')))
app.use(express.static(path.join(__dirname, '..', 'client', 'public')))

mongoose.
    connect("mongodb+srv://prasad178:pass123@cluster0.hvwuyz0.mongodb.net/auth?retryWrites=true&w=majority").then(() => {
    app.listen(3000, () => {
        console.log("Server live on port 3000")
    })
}).catch((err: any) => console.log(err))

app.get('/*', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.post('/login', login)

app.post('/register', signup)

export {};
