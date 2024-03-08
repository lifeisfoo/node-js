import express from "express";
import compression from "compression";
import pino from "pino-http";
import mongoose from "mongoose";
import sourcesRoutes from "./routes/sources.mjs";
import feedsRoutes from "./routes/feeds.mjs";
import feedsUpdateRoutes from "./routes/feeds-update.mjs";

await mongoose.connect("mongodb://127.0.0.1:27017/feed-reader");
const app = express();
const port = 3000;

app.use(pino());
app.use(compression());

app.use("/sources", sourcesRoutes);
app.use("/feeds", feedsRoutes);
app.use("/feeds-update", feedsUpdateRoutes);

app.listen(port, () => {
    console.log(`FEED app listening on port ${port}`);
});
