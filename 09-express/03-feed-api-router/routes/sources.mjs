import express from "express";
import { Source } from "../models/Source.mjs";
import { wrap } from "../utils.mjs";

const router = express.Router();
router.use(express.json());

router.post(
    "/",
    wrap(async (req, res) => {
        const source = new Source({ url: req.body.url });
        req.log.info(`Adding new Source: ${source}`);
        try {
            await source.save();
            res.json(source);
        } catch (e) {
            const reason = Source.getErrorReason(e);
            if (reason) {
                req.log.error(reason);
                res.status(400).send();
            } else {
                req.log.error("An error occurred during Source.save()");
                res.status(500).send();
            }
        }
    })
);

router.get(
    "/",
    wrap(async (req, res) => {
        const sources = await Source.find({}).exec();
        res.json(sources);
    })
);

router.delete(
    "/:id",
    wrap(async (req, res) => {
        try {
            await Source.findByIdAndDelete(req.params.id).exec();
            res.status(200).send();
        } catch {
            req.log.error(
                `Error while deleting Source with id ${req.params.id}`
            );
        }
    })
);

export default router;
