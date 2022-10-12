import express from "express"
import mongoose from "mongoose"
import router from "./routes/userRoutes"
import { Request, Response } from "express"

const app = express()
app.use(express.json())
app.use('/account', router)

mongoose.
    connect("mongodb+srv://prasad178:pass123@cluster0.hvwuyz0.mongodb.net/auth?retryWrites=true&w=majority").then(() => {
    app.listen(4000, () => {
        console.log("DB connected and server live on port 4000")
    })
}).catch((err: any) => console.log(err))

app.get('/', (req: Request, res: Response) => {
    res.send("Hello there")
})

export {};