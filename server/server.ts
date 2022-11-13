export {}

import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import router from "./routes/verificationRoutes"
import cookieParser from "cookie-parser"
import path from "path"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()
const app = express()

// mounting middleware
app.use(cors({origin:'http://localhost:3000', methods: ["GET", "POST", "PUT", "DELETE"], credentials: true,exposedHeaders: ['Set-Cookie', 'Date', 'ETag']}));
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(express.json())
app.use('/api/secure', router)

mongoose.
    connect(`mongodb+srv://prasad178:${process.env.MONGODB_PASSWORD}@cluster0.hvwuyz0.mongodb.net/auth?retryWrites=true&w=majority`)
    .then(() => {
    app.listen(5000, () => {
        console.log("Server live on port 5000")
    })
}).catch((err: any) => console.log(err))
