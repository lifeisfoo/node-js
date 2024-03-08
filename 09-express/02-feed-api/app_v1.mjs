import express from "express";
import { getLatestEntries } from "./get-feeds.mjs";
const app = express();
const port = 3000;

const wrap =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2]);

const sources = [];

app.use(express.json());

app.post("/sources", (req, res) => {
    sources.push(req.body.url);
    res.json(sources);
});

app.get("/sources", (req, res) => {
    res.json(sources);
});

app.get(
    "/feeds",
    wrap(async (req, res) => {
        const entries = await getLatestEntries(sources);
        res.json(entries);
    })
);

app.listen(port, () => {
    console.log(`FEED app listening on port ${port}`);
});
