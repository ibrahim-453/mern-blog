import express from 'express'
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRouter)

export {app}