import express from "express";
import { getLatestEntries } from "./get-feeds.mjs";
import compression from "compression";
import pino from "pino-http";
import mongoose from "mongoose";
import { Source } from "./models/Source_v1.mjs";

await mongoose.connect("mongodb://127.0.0.1:27017/feed-reader");

const app = express();
const port = 3000;

const wrap =
    (fn) =>
    (...args) =>
        fn(...args).catch(args[2]);

app.use(pino());
app.use(compression());
app.use(express.json());

app.post(
    "/sources",
    wrap(async (req, res) => {
        const source = new Source({ url: req.body.url });
        req.log.info(`Adding new Source: ${source}`);
        try {
            await source.save();
            res.json(source);
        } catch (e) {
            req.log.error("An error occurred during Source.save()");
            res.status(500).send();
        }
    })
);

app.get(
    "/sources",
    wrap(async (req, res) => {
        const sources = await Source.find({}).exec();
        res.json(sources);
    })
);

app.delete(
    "/sources/:id",
    wrap(async (req, res) => {
        try {
            await Source.findByIdAndDelete(req.params.id).exec();
            res.status(200).send();
        } catch {
            req.log.error(
                `Error while deleting Source with id ${req.params.id}`
            );
        }
    })
);

app.get(
    "/feeds",
    wrap(async (req, res) => {
        const sources = await Source.find({}).exec();
        const urls = sources.map((s) => s.url);
        req.log.debug(`Feed sources are ${urls}`);
        const entries = await getLatestEntries(urls);
        res.json(entries);
    })
);

app.listen(port, () => {
    console.log(`FEED app listening on port ${port}`);
});
