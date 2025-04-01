export const config = {
    resend: {
        apiKey: process.env.VITE_RESEND_API_KEY || "",
    },
    email: {
        from: "Contact Form <info@virtara.co.za>",
        to: "info@virtara.co.za",
    }
} as const; 