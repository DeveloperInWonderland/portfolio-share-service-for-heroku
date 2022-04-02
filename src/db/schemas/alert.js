import { Schema, model } from "mongoose";

const AlertSchema = new Schema({
    id: {
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: false,
    },
    changedAt: {
        type: Date,
        required: true,
    },
});

const AlertModel = model("Alert", AlertSchema);

export { AlertModel };
