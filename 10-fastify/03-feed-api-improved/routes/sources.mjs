import { Source } from "../models/Source.mjs";

async function sourcesRoutes(fastify, opts) {
    const postFeedsSchema = {
        body: {
            type: "object",
            required: ["url"],
            properties: {
                url: { type: "string" },
            },
        },
    };
    fastify.post("/", { schema: postFeedsSchema }, async (request, reply) => {
        const source = new Source({ url: request.body.url });
        request.log.info(`Adding new Source: ${source}`);
        try {
            await source.save();
            return source;
        } catch (e) {
            const reason = Source.getErrorReason(e);
            if (reason) {
                const err = new Error(reason);
                err.statusCode = 400;
                throw err;
            } else {
                throw new Error("An error occurred during Source.save()");
            }
        }
    });

    const getSourcesSchema = {
        response: {
            200: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        _id: { type: "string" },
                        url: { type: "string" },
                    },
                },
            },
        },
    };
    fastify.get("/", { schema: getSourcesSchema }, async (request, reply) => {
        const sources = await Source.find({}).exec();
        return sources;
    });

    fastify.delete("/:id", async (request, reply) => {
        try {
            await Source.findByIdAndDelete(request.params.id).exec();
            return reply.code(200).send();
        } catch {
            throw new Error(
                `Error while deleting Source with id ${request.params.id}`
            );
        }
    });
}

export default sourcesRoutes;
