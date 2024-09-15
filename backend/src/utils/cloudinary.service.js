import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "dud3dakps",
  api_key: "469942377479257",
  api_secret: "M8b7LXuUWd-E7gyb59wtqwGkyk0",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      return null;
    }
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
