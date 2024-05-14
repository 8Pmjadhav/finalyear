import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath,foldername) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            folder:foldername,
            resource_type: "auto"
        })
        // file has been uploaded successfull
        console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

const deleteOnCloudinary = async  (public_id,foldername,resource_type) => {
    try {
        if(!public_id)  return null;

        const response = await cloudinary.uploader.destroy(public_id,{
            folder:foldername,
            resource_type:resource_type,
            invalidate:true
        })
        console.log(response);
        return response;
    }
    catch (error) {
        console.error("Errors on deleteOnCloudinary ",error);
        return null;
    }
}



export {uploadOnCloudinary,deleteOnCloudinary}