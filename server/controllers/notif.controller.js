const emailNotif = require('../utils/emailNotif');

const sendNotification = async (req, res) => {
    try {
        await emailNotif.sendEmail();
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
};

module.exports = {
    sendNotification,
};