const Queue = require('bull');
const sendEmail = require('./NodemailerService'); // Đảm bảo đường dẫn chính xác

const emailQueue = new Queue('emailQueue', {
  redis: {
    port: 6379,
    host: 'localhost'
  }
});

emailQueue.process(async (job) => {
  const { email, subject, message } = job.data;
  await sendEmail(email, subject, message);
});

module.exports = emailQueue;
