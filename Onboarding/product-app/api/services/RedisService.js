const Redis = require('ioredis');
const redis = new Redis(); 

module.exports = {
    publish: function (channel, message) {
        redis.publish(channel, message);
    },

    subscribe: function (channel, callback) {
        const subscriber = new Redis();
        subscriber.subscribe(channel);
        subscriber.on('message', (channel, message) => {
            callback(message);
        });
    }
};