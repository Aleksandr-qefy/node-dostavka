//const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
const User = require("../models/User");
const Courier = require("../models/User");

module.exports = function (passport) {
  const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = 'secret';
  //opts.issuer = 'accounts.examplesoft.com';
  //opts.audience = 'yoursite.net';
  passport.use('user-jwt', new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
      const user = await User.findOne({ where: {id: jwt_payload.sub} });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }

    } catch (err) {
      return done(err, false);
    }
    /*User.findOne( {where: {id: jwt_payload.sub}}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });*/
  }));

  passport.use('courier-jwt', new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
      const courier = await Courier.findOne({ where: {id: jwt_payload.sub} });

      if (courier) {
        return done(null, courier);
      } else {
        return done(null, false);
        // or you could create a new account
      }

    } catch (err) {
      return done(err, false);
    }
  }));

};