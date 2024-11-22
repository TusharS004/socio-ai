import express from "express";
import "dotenv/config.js";
import { getInstagramPost, getTweet } from "./src/controllers/socialMedia.controller.js";
import { connect } from "./src/config/db.config.js";
import routes from "./src/routes/index.js";
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

app.use('/api', routes);

app.get('/tweet', getTweet);
app.get('/instagram', getInstagramPost);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});