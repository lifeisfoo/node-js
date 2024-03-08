import Fastify from "fastify";
const fastify = Fastify({
    logger: {
        level: "debug",
    },
    requestIdLogLabel: "rid",
    requestIdHeader: "X-Request-ID",
});

fastify.get("/", async function handler(request, reply) {
    request.log.info("Handling hello world");
    return { hello: "world" };
});

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
