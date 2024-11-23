import "dotenv/config.js";
import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";
import { connect } from "./src/config/db.config.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.use('/api', routes);

connect().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});