import {Client, resend} from "@upstash/qstash";
import {config} from "../config/env";

const client = new Client({token: config.qstash.token});

const sendEmail = async (subject: string, message: string) => {
    await client.publishJSON({
        api: {
            name: "email",
            provider: resend({token: config.resend.apiKey})
        },
        body: {
            from: config.email.from,
            to: config.email.to,
            subject,
            html: message,
        },
    });
};

export default sendEmail;
