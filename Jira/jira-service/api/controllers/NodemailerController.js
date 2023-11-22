const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // Máy chủ SMTP của Outlook
    secureConnection: false, // Sử dụng STARTTLS
    port: 587, // Port cho STARTTLS
    auth: {
        user: "hoanganh81097@gmail.com", // Thay thế bằng địa chỉ email Outlook của bạn
        pass: "Hoanganh97" // Thay thế bằng mật khẩu của bạn
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
