const redis = require('redis');
const config = require('../config/redis.config');

const port = config.REDIS_PORT;
const host = config.REDIS_HOST;

module.exports = redis.createClient(port, host);