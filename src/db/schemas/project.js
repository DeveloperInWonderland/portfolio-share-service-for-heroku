import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        user_id: {
            type: Schema.Types.String,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
            default: "설명이 아직 없습니다. 추가해 주세요.",
        },
        from_date: {
            type: Date,
            required: true,
        },
        to_date: {
            type: Date,
            required: false,
        },
    },
    { timestamps: true },
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
