import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            default: 0
        },
        reviews: {
            type: Number,
            default: 0
        },
        stock: {
            type: Number,
            default: 0
        },
        category: {
            type: String
        },
        status: {
            type: String,
            enum: ['draft', 'listed'],
            default: 'draft',
        },
    },
    { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
