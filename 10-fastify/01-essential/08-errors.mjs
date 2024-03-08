import Fastify from "fastify";
const fastify = Fastify({
    logger: true,
});

fastify.post("/", function handler(request, reply) {
    return "OK";
});
fastify.get("/throw", function handler(request, reply) {
    throw new Error("Something went wrong");
});
fastify.get("/reject", function handler(request, reply) {
    return Promise.reject(new Error("Not resolved"));
});
fastify.get("/await-err", async function handler(request, reply) {
    await Promise.reject(new Error("Await error"));
});

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
