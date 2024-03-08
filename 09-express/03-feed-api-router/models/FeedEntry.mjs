import mongoose from "mongoose";
const { Schema } = mongoose;

const feedEntrySchema = new Schema({
    source: { type: Schema.Types.ObjectId, ref: "Source" },
    title: { type: String },
    link: { type: String, unique: true },
    date: { type: Date },
});

const FeedEntry = mongoose.model("FeedEntry", feedEntrySchema);
export { FeedEntry };
