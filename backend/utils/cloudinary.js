import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({});

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadMedia = async (file) =>{
    try {
        const uploadResponse = await cloudinary.uploader.upload(file, {
            resource_type: "auto"
        })
        return uploadResponse;
    } catch (error) {
        console.log("Error in uploading media to cloudinary")
        console.error(error)
    }
}

export const deleteMediaFromCloudinary = async(publicId)=>{
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("Error in deleting media from cloudinary")
        console.error(error)
    }
}
 
export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "video" });
    return result
  } catch (error) {
    console.error("Error deleting media from Cloudinary:", error)
    return null
  }
}

export const generateSignedVideoUrl = (publicId) => {
  return cloudinary.v2.url(publicId, {
    resource_type: "video",
    type: "authenticated",
    sign_url: true,
    expires_at: Math.floor(Date.now() / 1000) + 60 * 5 
  });
};