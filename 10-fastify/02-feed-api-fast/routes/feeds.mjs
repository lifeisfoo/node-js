import { FeedEntry } from "../models/FeedEntry.mjs";

async function feedsRoutes(fastify, opts) {
    fastify.get("/", async (request, reply) => {
        let findQuery = {};
        if (request.query.sourceId) {
            findQuery.source = request.query.sourceId;
        }
        const feedEntries = await FeedEntry.find(findQuery)
            .sort({ date: -1 })
            .limit(20)
            .exec();
        return feedEntries;
    });
}
export default feedsRoutes;
