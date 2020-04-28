const redis = require('redis');
const { REDIS_CONF } = require('../conf/db.js');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('err', err => {
    console.log(err);
});

module.exports = redisClient;
