const nodemailer = require("nodemailer")

const dotenv = require("dotenv")
dotenv.config()

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

function sendEmail(options) {
    return new Promise((resolve, reject) => {
        const to = options.to
        const subject = options.subject
        const message = options.message

        const messageHtml = options.html || message.replace("\n", "<br/>")

        transporter.sendMail({
            from: '"Gallery Project" <teamtweetie@gmail.com>',
            to,
            subject,
            text: message,
            html: messageHtml
        }).then((sentMessageInfo) => {
            const wasSentSuccessfully = sentMessageInfo.accepted.includes(to)

            if (wasSentSuccessfully) {
                resolve()
            } else {
                reject()
            }
        }).catch((err) => {
            console.log("Error sending email hahahaha :D", err);
            reject()
        })
    })
}

module.exports = {
    sendEmail
}