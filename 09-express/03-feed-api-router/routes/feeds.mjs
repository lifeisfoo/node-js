import express from "express";
import { wrap } from "../utils.mjs";
import { FeedEntry } from "../models/FeedEntry.mjs";

const router = express.Router();

router.get(
    "/",
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

export default router;
