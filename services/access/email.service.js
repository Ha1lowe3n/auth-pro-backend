import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationEmail(userEmail, activateLink) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: userEmail,
            subject: "Активация аккаунта",
            text: "",
            html: `
                    <div>
                        <h1>Активация аккаунта</h1>
                        <a href="${activateLink}">${activateLink}</a>
                    </div>
                `,
        });
    }
}

export default new EmailService();
