import express from "express";
import { Source } from "../models/Source.mjs";
import { wrap } from "../utils.mjs";
import getFeedEntries from "../get-feeds.mjs";
import { FeedEntry } from "../models/FeedEntry.mjs";

const router = express.Router();

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

router.post(
    "/",
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

export default router;
