import express from 'express'
import "dotenv/config"

const app = express()


app.listen(process.env.PORT,()=>{
    console.log(`server started at ${process.env.PORT}`)
})