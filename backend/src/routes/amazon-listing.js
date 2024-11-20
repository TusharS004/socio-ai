import express from "express";  
import AmazonProductListing from "../schema/AmazonProductListing.js";

const router = express.Router();

router.post("/product-listings", async (req, res) => {
  try {
    const { title, description, price, category, imageUrl, stock, status, currency, rating, reviews } = req.body;
    
    if(!title || !description || !price || !category || !imageUrl || !stock || !status || !currency || !rating || !reviews) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingListing = await AmazonProductListing.findOne({ title, description, price, category, imageUrl, stock, status, currency, rating, reviews });

    if (existingListing) {
      return res.status(400).json({ message: "Listing already exists." });
    }

    const newListing = new AmazonProductListing({ title, description, price, category, imageUrl, stock, status, currency, rating, reviews });

    const savedListing = await newListing.save();

    res.status(201).json({message: "Listing created successfully", listing: savedListing});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/product-listings", async (req, res) => {
  try {
    const listings = await AmazonProductListing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/product-listings/:id", async (req, res) => {
  try {
    const listing = await AmazonProductListing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/product-listings/:id", async (req, res) => {
  try {
    const updatedListing = await AmazonProductListing.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    
    if (!updatedListing)
      return res.status(404).json({ message: "Listing not found" });

    res.status(200).json(updatedListing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/product-listings/:id", async (req, res) => {
  try {
    const deletedListing = await AmazonProductListing.findByIdAndDelete(
      req.params.id
    );
    if (!deletedListing)
      return res.status(404).json({ message: "Listing not found" });
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
