import express from "express";
import "dotenv/config.js";
import { getInstagramPost, getTweet } from "./src/controllers/socialMedia.controller.js";
import { analyzeWithGemini } from "./src/controllers/gemini.controller.js";
import { connect } from "./src/db/connect.js";
import authRoutes from "./src/routes/auth.js";
import socialMediaRoutes from "./src/routes/social-media.js";
import productListingRoutes from "./src/routes/amazon-listing.js";
import {authenticateUser} from "./src/utils/helper.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

connect();

app.get("/api", (req, res) => {
    res.send("API is Running.");
});


// Authentication
app.use('/auth', authRoutes);

// Session Stored
app.use("/api", authenticateUser);

// Post Extracted Json Data
app.use("/api/post", socialMediaRoutes);

// Amazon Listed Data
app.use("/api/product", productListingRoutes);

// Twitter
app.get('/api/tweet', getTweet);

// Instagram
app.get('/api/instagram', getInstagramPost);

// Analyze Data using AI Model
app.get('/api/analyze', analyzeWithGemini);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});