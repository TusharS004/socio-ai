import cloudinary from "../config/cloudinary.config";

export const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            type: 'upload',
            resource_type: 'auto',
            folder: process.env.CLOUDINARY_FOLDER,
        });
        return {url: result.url, publicId: result.public_id, secureUrl: result.secure_url};
    } catch (error) {
        throw new Error('Failed to upload image to Cloudinary');
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