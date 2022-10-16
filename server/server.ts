import express from "express"
import mongoose from "mongoose"
import router from "./routes/userRoutes"
import { Request, Response } from "express"
import cookieParser from "cookie-parser"

const app = express()

// mounting middleware
app.use(cookieParser())
app.use(express.json())
app.use('/account', router)

mongoose.
    connect("mongodb+srv://prasad178:pass123@cluster0.hvwuyz0.mongodb.net/auth?retryWrites=true&w=majority").then(() => {
    app.listen(4000, () => {
        console.log("Server live on port 4000")
    })
}).catch((err: any) => console.log(err))

app.get('/', (req: Request, res: Response) => {
    res.send("Hello there")
})

export {};