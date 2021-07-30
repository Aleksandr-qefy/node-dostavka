const RateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const client = require("../redis/redis")

module.exports.registrationLimiter =
new RateLimit({
  store: new RedisStore({
    client: client,
  }),
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  //delayMs: 0, // disable delaying - full speed until the max limit is reached
  expiry: 1 * 60 * 1000,
  message: {
    error: 'too many requests',
    message: "Too many requests from this IP, please try again after an hour"
  }
});

module.exports.loginLimiter = new RateLimit({
  store: new RedisStore({
    client: client,
  }),
  windowMs: 5 * 60 * 1000, // 3 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  //delayMs: 0, // disable delaying - full speed until the max limit is reached
  expiry: 3 * 60 * 1000,
  message: {
    error: 'too many requests',
    message: "Too many requests from this IP, please try again after an hour"
  }
});

/*
expiry: seconds - how long each rate limiting window exists for. Defaults to 60.
resetExpiryOnChange: boolean - if the expiry time should b6e reset every time a key is incremented/decremented. This means that when the limit is reached and the user is given a 429 response, the rate limit window is extended. Defaults to false.
prefix: string - prefix to add to entries in Redis. Defaults to rl:.
client: Redis Client or ioredis Client- A Redis Client to use. Defaults to require('redis').createClient();.
redisURL: string - a Redis connection string to be used for the default client connection. Ignored when the client option is provided. Redis Client connection string format and options.
passIfNotConnected: boolean - If Redis is not connected, let the request succeed as failover. Defaults to false.
 */

/*const express = require('express');
const router = express.Router();
const client = require("../redis/redis");

const limiter = require('express-limiter')(router, client);

module.exports.registrationLimiter = limiter({
  total: 5, // 5 requests per 3 minutes
  expire: 3 * 60 * 1000, // 3 minutes
  method: 'all',
  lookup: 'connection.remoteAddress',
  onRateLimited: function (req, res, next) {
    next({
      message: {
        error: 'too many requests',
        message: "Too many requests from this IP, please try again after an hour"
      },
      status: 429
    })
  }
})

module.exports.loginLimiter = limiter({
  total: 5, // 5 requests per 5 minutes
  expire: 5 * 60 * 1000, // 5 minutes
  method: 'all',
  lookup: 'connection.remoteAddress',
  onRateLimited: function (req, res, next) {
    next({
      message: {
        error: 'too many requests',
        message: "Too many requests from this IP, please try again after an hour"
      },
      status: 429
    })
  }
})*/