/*//const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.json')[env];
const User = require("../models/User");
const Courier = require("../models/User");
const jwtConfig = require("../config/jwt.config");

module.exports = function (passport) {
  const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = jwtConfig.secret;
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
    // User.findOne( {where: {id: jwt_payload.sub}}, function(err, user) {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //   // or you could create a new account
    //  }
    //});
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

};*/
// const googleConfig = require('../config/google.auth0.config')
//
// module.exports = function (passport) {
//   const GoogleStrategy = require('passport-google-oauth20').Strategy;
//   passport.use('google-profile', new GoogleStrategy({
//         clientID: googleConfig.GOOGLE_CLIENT_ID,
//         clientSecret: googleConfig.GOOGLE_CLIENT_SECRET,
//         callbackURL: googleConfig.CALLBACK_URL//"http://www.example.com/auth/google/callback"
//       },
//       /*function(token, tokenSecret, profile, done) {
//           User.findOrCreate({ googleId: profile.id }, function (err, user) {
//             return done(err, user);
//           });
//       }*/
//       (token, tokenSecret, profile, done) => {
//         return done(null, profile);
//       }
//     ));
//
// };