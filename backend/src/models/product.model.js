import { Schema, model } from 'mongoose';

const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
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
        category: [{
            type: String,
        }],
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
        image: [{
            type: String, // URL
        }],
        video: [{
            type: String, // URL
        }],
    },
    { timestamps: true }
);

const Product = model('Product', productSchema);

export default Product;
