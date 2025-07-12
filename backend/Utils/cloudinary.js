import cloudinary from 'cloudinary'
import dotenv from 'dotenv'
dotenv.config();

cloudinary.config({
    cloud_name:process.env.cloudinary_cloud_name,
    cloud_api_key:process.env.cloudinary_api_key,
    cloud_secret_key:process.env.cloudinary_api_secret,
})

export default cloudinary;
