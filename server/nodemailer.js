const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
        user: "katsbox118@outlook.com",
        pass: "Luhansehun520"
    }
});

const options = {
    from: "katsbox118@outlook.com",
    to: "ivkookie9@gmail.com",
    subject: "Thank you for your purchase! A follow up email will be send when your order is processed.",
    text: "your order number is 2324!"
}

transporter.sendMail(options, function(err, info) {
    if (err) {
        console.log(err);
        return;
    } console.log("Sent", info.response)
});