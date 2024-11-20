import mongoose from "mongoose";

const AmazonProductListingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    imageUrl: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    stock: { type: Number, required: true },
    category: { type: String },
    status: { type: String, enum: ["draft", "listed"], default: "draft" },
  },
  { timestamps: true }
);

const AmazonProductListing = mongoose.model(
  "AmazonProductListing",
  AmazonProductListingSchema
);

export default AmazonProductListing;
