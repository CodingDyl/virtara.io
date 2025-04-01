const BACKEND_URL = 'https://virtara-backend.vercel.app' 

const sendEmail = async (subject: string, message: string) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject,
                message
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export default sendEmail;
