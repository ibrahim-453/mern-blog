import express from 'express'
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import blogRouter from './routes/blog.routes.js'
import commentRouter from './routes/comment.routes.js'
import contactRouter from './routes/contact.routes.js'
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
app.use("/api/v1/blog",blogRouter)
app.use("/api/v1/comment",commentRouter)
app.use("/api/v1/contact",contactRouter)
export {app}