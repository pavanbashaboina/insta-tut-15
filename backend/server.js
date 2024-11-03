import express from 'express'
import "dotenv/config"
import mongoose from 'mongoose'
import userRoutes from "./routes/userRoutes.js"
import ErrorMiddleware from './middlewares/error.js'
import cors from "cors"

const app = express()

//DB connection
mongoose.connect(process.env.MONGO_URL).then((data) => {
    console.log(data.connection.host)
})

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

//routes
app.use("/api/v1", userRoutes)

//middleware
app.use(ErrorMiddleware)

//server
app.listen(process.env.PORT, () => {
    console.log(`server started at ${process.env.PORT}`)
})