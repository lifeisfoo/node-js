import { FeedEntry } from "../models/FeedEntry.mjs";

async function feedsRoutes(fastify, opts) {
    fastify.route({
        method: "GET",
        url: "/",
        schema: {
            querystring: {
                sourceId: { type: "string" },
            },
            response: {
                200: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            source: { type: "string" },
                            title: { type: "string" },
                            link: { type: "string" },
                            date: { type: "string" },
                        },
                    },
                },
            },
        },
        handler: async (request, reply) => {
            let findQuery = {};
            if (request.query.sourceId) {
                findQuery.source = request.query.sourceId;
            }
            const feedEntries = await FeedEntry.find(findQuery)
                .sort({ date: -1 })
                .limit(20)
                .exec();
            return feedEntries;
        },
    });
}
export default feedsRoutes;
