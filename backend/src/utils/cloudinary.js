import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_KEY_SECRET
});

const uploadOnCloudinary = async(localfilepath)=>{
    try {
        if(!localfilepath){
            return null
        }
        const res = await cloudinary.uploader.upload(localfilepath,{
            resource_type : "auto"
        })
        console.log("File uploaded on Cloudinary",res.url);
        fs.unlinkSync(localfilepath)
        return res
    } catch (error) {
        fs.unlinkSync(localfilepath)
        return null
    }
}

export default uploadOnCloudinary