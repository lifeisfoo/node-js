import express from "express";
import getFeedEntries from "./get-feeds.mjs";
import compression from "compression";
import pino from "pino-http";
import mongoose from "mongoose";
import { Source } from "./models/Source_v1.mjs";
import { FeedEntry } from "./models/FeedEntry.mjs";

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
            const reason = Source.getErrorReason(e);
            if (reason) {
                req.log.error(reason);
                res.status(400).send();
            } else {
                req.log.error("An error occurred during Source.save()");
                res.status(500).send();
            }
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
        let findQuery = {};
        if (req.query.sourceId) {
            findQuery.source = req.query.sourceId;
        }
        const feedEntries = await FeedEntry.find(findQuery)
            .sort({ date: -1 })
            .limit(20)
            .populate("source")
            .exec();
        res.json(feedEntries);
    })
);
function generateFeedEntries(entries, s) {
    return entries.map((en) => {
        return new FeedEntry({
            source: s._id,
            title: en.title,
            link: en.link,
            date: new Date(en.pubDate),
        }).save();
    });
}
async function waitAndCountFulfilled(proms) {
    const promsSettled = await Promise.allSettled(proms);
    return promsSettled.filter((r) => r.status === "fulfilled").length;
}
app.post(
    "/feeds-update",
    wrap(async (req, res) => {
        const sources = await Source.find({}).exec();
        let totalNewEntries = 0;
        for (const s of sources) {
            const entries = await getFeedEntries(s.url);
            const savingModels = generateFeedEntries(entries, s);
            let newCount = await waitAndCountFulfilled(savingModels);
            totalNewEntries += newCount;
            req.log.info(
                `Feed ${s.url}: found ${entries.length} and saved ${newCount} entries`
            );
        }
        res.json({ totalNewEntries });
    })
);

app.listen(port, () => {
    console.log(`FEED app listening on port ${port}`);
});
