import mongoose from "mongoose";
const { Schema } = mongoose;

const sourceSchema = new Schema({
    url: { type: String, required: true },
});

const Source = mongoose.model("Source", sourceSchema);
export { Source };
