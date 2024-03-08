import Fastify from "fastify";
const fastify = Fastify({
    logger: true,
});

fastify.get("/headers", (request, reply) => {
    return { headers: request.headers };
});
fastify.get("/query", (request, reply) => {
    return { query: request.query };
});
fastify.post("/body", async function handler(request, reply) {
    return request.body;
});

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
