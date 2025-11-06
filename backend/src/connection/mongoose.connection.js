import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'
import debug from 'debug'

const dbgr = debug("development:mongoose")

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        dbgr(`Database connected at ${connectionInstance.connection.host}`)
    } catch (error) {
        dbgr(`Database connection failed : ${error}`)
    }
}

export {connectDB}