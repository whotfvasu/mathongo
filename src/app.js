import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import chapterRoutes from "./routes/chapterRoutes.js";
import { rateLimiterMiddleware } from "./middlewares/rateLimiter.js";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(rateLimiterMiddleware);

app.use("/api/v1/chapters", chapterRoutes);

app.get("/", (req, res) => {
  res.send("Chapter Performance Dashboard API");
});

export default app;
