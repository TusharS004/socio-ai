import express from "express";
import "dotenv/config.js";
import { getInstagramPost, getTweet } from "./src/controllers/socialMedia.controller.js";
import { analyzeWithGemini } from "./src/controllers/gemini.controller.js";
import { connect } from "./src/db/connect.js";
import authRoutes from "./src/routes/auth.js";
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

app.use('/auth', authRoutes);
app.get('/api/tweet', getTweet);
app.get('/api/instagram', getInstagramPost);
app.get('/api/analyze', analyzeWithGemini);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});