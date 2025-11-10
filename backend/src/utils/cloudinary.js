import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_KEY_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "blogs",
    });
    console.log("File uploaded to Cloudinary:", res.secure_url);

    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

    return res;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};

export default uploadOnCloudinary;
