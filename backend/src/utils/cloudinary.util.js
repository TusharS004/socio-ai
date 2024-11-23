import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.config.js";

export const uploadToCloudinary = async (filePath) => {
    try {

        const result = await cloudinary.uploader.upload(path.resolve(filePath), {
            type: 'upload',
            resource_type: 'auto',
            folder: process.env.CLOUDINARY_FOLDER,
        });
        console.log('Uploaded at Cloudinary', result.url);
        return {url: result.url, publicId: result.public_id};
    } catch (error) {
        throw new Error('Failed to upload image to Cloudinary');
    } finally {
        // Delete the file after uploading to Cloudinary
        fs.unlinkSync(filePath);
    }
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error('Failed to delete image from Cloudinary');
    }
};