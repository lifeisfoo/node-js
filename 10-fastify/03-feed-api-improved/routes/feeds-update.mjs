import { Source } from "../models/Source.mjs";
import { FeedEntry } from "../models/FeedEntry.mjs";
import getFeedEntries from "../get-feeds.mjs";

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

async function feedsUpdateRoutes(fastify, opts) {
    fastify.post("/", async (request, reply) => {
        const sources = await Source.find({}).exec();
        let totalNewEntries = 0;
        for (const s of sources) {
            const entries = await getFeedEntries(s.url);
            const savingModels = generateFeedEntries(entries, s);
            let newCount = await fastify.waitAndCountFulfilled(savingModels);
            totalNewEntries += newCount;
            request.log.info(
                `Feed ${s.url}: found ${entries.length} and saved ${newCount} entries`
            );
        }
        return { totalNewEntries };
    });
}
export default feedsUpdateRoutes;
