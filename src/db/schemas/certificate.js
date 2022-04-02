import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
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
        when_date: {
            type: Date,
            required: true,
        },
    },
    { timestamps: true },
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
