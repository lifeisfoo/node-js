import express from "express";
import { getLatestEntries } from "./get-feeds.mjs";
import compression from "compression";
import pino from "pino-http";

const app = express();
const port = 3000;

const wrap =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2]);

const sources = [];

app.use(pino());
app.use(compression());
app.use(express.json());

app.post("/sources", (req, res) => {
    sources.push(req.body.url);
    req.log.info(`New URL added to sources: ${req.body.url}`);
    res.json(sources);
});

app.get("/sources", (req, res) => {
    res.json(sources);
});

app.get(
    "/feeds",
    wrap(async (req, res) => {
        req.log.debug(`Feed sources are ${sources}`);
        const entries = await getLatestEntries(sources);
        res.json(entries);
    })
);

app.listen(port, () => {
    console.log(`FEED app listening on port ${port}`);
});
