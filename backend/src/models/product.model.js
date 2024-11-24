import { Schema, model } from 'mongoose';

const productSchema = new Schema(
    {
        url: {
            type: String,
        },
        brand: {
            type: String,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
        },
        category:[
            {
                type: String,
            }
        ],
        keywords: [
            {
                type: String,
            }
        ],
        status: {
            type: String,
            enum: ['draft', 'listed'],
            default: 'draft',
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        images: [
            {
                type: {
                    url: { type: String, required: true },
                    publicId: { type: String, required: true },
                    _id: false,
                }, // Cloudinary URL
            },
        ],
        videos: [
            {
                type: {
                    url: { type: String, required: true },
                    publicId: { type: String, required: true },
                    _id: false,
                }, // Cloudinary URL
            },
        ],
    },
    { timestamps: true }
);

const Product = model('Product', productSchema);

export default Product;