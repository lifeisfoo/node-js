import Fastify from "fastify";
const fastify = Fastify({
    logger: true,
});
import mongoose from "mongoose";
import compress from "@fastify/compress";

import feedsRoutes from "./routes/feeds.mjs";
import sourcesRoutes from "./routes/sources.mjs";
import feedsUpdateRoutes from "./routes/feeds-update.mjs";
import asyncUtils from "./plugins/async-utils.mjs";

await mongoose.connect("mongodb://127.0.0.1:27017/feed-reader");

fastify.addHook("onSend", async (request, reply, payload) => {
    reply.header("server", "fastify");
});
fastify.register(compress);
fastify.register(asyncUtils);
fastify.register(feedsRoutes, { prefix: "/feeds" });
fastify.register(sourcesRoutes, { prefix: "/sources" });
fastify.register(feedsUpdateRoutes, { prefix: "/feeds-update" });

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
