const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    auth: {
        user: "hoanganh81097@gmail.com",
        pass: "Hoanganh97"
    },
    tls: {
        ciphers: 'SSLv3'
    }
});

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: 'hoanganh81097@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
