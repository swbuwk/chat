const db = require("../db.js")
const nodemailer = require("nodemailer")
const ApiError = require("../exceptions/api_error.js")

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
        })
    }

    async sendActivationMail(mail, link) {
        this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: mail,
            subject: `Активация аккаунта на сайте ${process.env.API_URL}`,
            text: "",
            html: 
                `
                    <div>
                        <h1>Для активации аккаунта перейдите по ссылке ниже:</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
        console.log("sended")
    }
} 

module.exports = new MailService()