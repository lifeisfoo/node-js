import mongoose from "mongoose";
const { Schema } = mongoose;

const sourceSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                try {
                    const url = new URL(v);
                    if (!url.protocol.startsWith("http")) {
                        return false;
                    }
                } catch {
                    return false;
                }
                return true;
            },
            message: (props) => `${props.value} is not a valid URL`,
        },
    },
});
sourceSchema.static("getErrorReason", (e) => {
    if (e.name === "ValidationError") {
        return "Source validation failed";
    } else if (e.code === 11000) {
        return "Feed already exists";
    } else {
        return null;
    }
});

const Source = mongoose.model("Source", sourceSchema);
export { Source };
