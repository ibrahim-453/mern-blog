import { app } from "../src/app.js";
import { connectDB } from "../src/connection/mongoose.connection.js";
import debug from "debug";
import dotenv from 'dotenv'

const dbgr = debug("development:Server")
dotenv.config({
    path : './env'
})

const PORT = process.env.PORT

connectDB()
.then(()=>{
    app.listen(PORT || 3000,()=>dbgr(`Server Started at http://localhost:${PORT}`))
})
.catch(()=>{
    dbgr(`Server not started`)
})
