import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
    credentials: {
        accessKeyId: process.env.AWS_ID,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

export const uploadImage = multer({
    limits: {
        // 2 MB
        fileSize: 2000000,
    },
    storage: multerS3({
        s3: s3,
        bucket: "portfolio-share-service/images",
        acl: "public-read",
    }),
});
