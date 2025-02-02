export const config = {
    qstash: {
        token: import.meta.env.VITE_QSTASH_TOKEN || "",
    },
    resend: {
        apiKey: import.meta.env.VITE_RESEND_API_KEY || "",
    },

    email: {
        from: "Contact Form <info@virtara.co.za>",
        to: "info@virtara.co.za",
    }
} as const; 