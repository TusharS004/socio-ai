import express from "express";
import "dotenv/config.js";
import { getInstagramPost, getTweet } from "./src/controllers/socialMedia.controller.js";
import { analyzeWithGemini } from "./src/controllers/gemini.controller.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
    res.send("API is Running.");
});

app.get('/api/tweet', getTweet);
app.get('/api/instagram', getInstagramPost);
app.get('/api/analyze', analyzeWithGemini);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});