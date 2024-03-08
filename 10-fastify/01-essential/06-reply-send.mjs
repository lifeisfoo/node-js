import Fastify from "fastify";
const fastify = Fastify({
    logger: true,
});

fastify.get("/return", function handler(request, reply) {
    return "return";
});
fastify.get("/return-async", function handler(request, reply) {
    return "return-async";
});
fastify.get("/reply-send", function handler(request, reply) {
    reply.send("reply-send");
});
fastify.get("/reply-send-async", async function handler(request, reply) {
    reply.send("reply-send-async");
    return reply;
});
fastify.get("/return-promise", function handler(request, reply) {
    return Promise.resolve("return-promise");
});

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
