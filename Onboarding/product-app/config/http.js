const rateLimit = require('express-rate-limit');

module.exports.http = {
  middleware: {
    order: [
      'cookieParser',
      'session',
      'limiter',
      'bodyParser',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],

    // Định nghĩa middleware limiter
    limiter: (function () {
      const rateLimit = require('express-rate-limit');
      return rateLimit({
        windowMs: 5 * 60 * 1000, // time
        max: 100,
        message: 'Bạn đã vượt quá số lượng yêu cầu cho phép!',
        headers: true,
      });
    })(),
  },

};