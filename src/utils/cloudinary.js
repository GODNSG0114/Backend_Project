import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async function (localFilepath) {
  try {
    if (!localFilepath) return null

    //upload file on cloudinary
    const responce = await cloudinary.uploader.upload(localFilepath, {
      resource_type: 'auto'
    })
    // file has been uploaded successfully
    console.log("file uploaded successfuly on cloudinary ", responce.url)
    return responce;
  } catch (error) {
        fs.unlinkSync(localFilepath)  // remove the locally saved temporary file as the upload operation got failed 
        return null
      }
}

export default uploadOnCloudinary;
