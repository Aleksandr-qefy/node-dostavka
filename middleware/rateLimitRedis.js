const RateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const client = require("../redis/redis")

module.exports = new RateLimit({
  store: new RedisStore({
    client: client,
  }),
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});
/*
expiry: seconds - how long each rate limiting window exists for. Defaults to 60.
resetExpiryOnChange: boolean - if the expiry time should be reset every time a key is incremented/decremented. This means that when the limit is reached and the user is given a 429 response, the rate limit window is extended. Defaults to false.
prefix: string - prefix to add to entries in Redis. Defaults to rl:.
client: Redis Client or ioredis Client- A Redis Client to use. Defaults to require('redis').createClient();.
redisURL: string - a Redis connection string to be used for the default client connection. Ignored when the client option is provided. Redis Client connection string format and options.
passIfNotConnected: boolean - If Redis is not connected, let the request succeed as failover. Defaults to false.
 */