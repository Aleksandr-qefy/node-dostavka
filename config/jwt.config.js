module.exports = {
  //jwtExpiration: 3600,           // 1 hour
  //jwtRefreshExpiration: 86400,   // 24 hours
  jwtExpiration: 60,          // 1 minute
  jwtRefreshExpiration: 120,  // 2 minutes
  //secret: 'secret',
  issuer: '',
  audience: '',
  ACCESS_TOKEN_SECRET: 'secret',
  REFRESH_TOKEN_SECRET: 'secretAnother',
};