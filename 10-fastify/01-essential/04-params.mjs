import Fastify from "fastify";
const fastify = Fastify({
    logger: true,
});

fastify.get("/hello/:name", async function handler(request, reply) {
    return { hello: request.params.name };
});
fastify.get("/any/*", async function handler(request, reply) {
    return { params: request.params };
});

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
