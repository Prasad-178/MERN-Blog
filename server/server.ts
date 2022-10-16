import express from "express"
import mongoose from "mongoose"
import router from "./routes/userRoutes"
import { Request, Response } from "express"
import cookieParser from "cookie-parser"
import path from "path"

const app = express()

// mounting middleware
app.use(cookieParser())
app.use(express.json())
app.use('/account', router)
app.use(express.static(path.join(__dirname, 'build')))

mongoose.
    connect("mongodb+srv://prasad178:pass123@cluster0.hvwuyz0.mongodb.net/auth?retryWrites=true&w=majority").then(() => {
    app.listen(3000, () => {
        console.log("Server live on port 3000")
    })
}).catch((err: any) => console.log(err))

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

export {};