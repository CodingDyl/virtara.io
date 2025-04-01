import { Resend } from 'resend';
import { config } from "../config/env";

const resend = new Resend(config.resend.apiKey);

const sendEmail = async (subject: string, message: string) => {
    try {
        const { data, error } = await resend.emails.send({
            from: config.email.from,
            to: config.email.to,
            subject: subject,
            html: message,
        });

        if (error) {
            throw error;
        }

        return data;
    } catch (error) {
        throw error;
    }
};

export default sendEmail;
