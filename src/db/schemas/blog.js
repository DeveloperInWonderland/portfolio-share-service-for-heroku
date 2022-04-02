import { Schema, model } from "mongoose";

const BlogSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String, 
            required: true,
        },
        service: {
            type: String,
            required: true,
        },
        url: {
            type: String, 
            required: true,
        }
    },
    {
        timestamps: true,
    },
);

const BlogModel = model("Blog", BlogSchema);

export { BlogModel };
