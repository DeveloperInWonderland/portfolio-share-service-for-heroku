const nodemailer = require("nodemailer");

const user = process.env.GOOGLE_ID;
const pass = process.env.GOOGLE_SECRET;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user,
        pass,
    },
});

module.exports = (to, subject, text) =>
    new Promise((resolve, reject) => {
        const message = {
            from: `"Portfolio Share Service" <${process.env.GOOGLE_ID}>`,
            to,
            subject,
            text,
        };
        transport.sendMail(message, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(info);
        });
    });
