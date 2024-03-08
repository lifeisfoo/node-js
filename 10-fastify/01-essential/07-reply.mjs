import Fastify from "fastify";
const fastify = Fastify({
    logger: true,
});

fastify.get("/reply", function handler(request, reply) {
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send({ name: "value" });
});

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
