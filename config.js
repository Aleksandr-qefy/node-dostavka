module.exports = {
  host: 'hostname',
  port: 80,

  SMSRU_LOGIN: process.env.SMSRU_LOGIN || 'qefy',
  SMSRU_PASSWORD: process.env.SMSRU_PASSWORD || 'nkego67cat',

  auth0config: {
    authRequired: false,
    auth0Logout: true,
    // auth router attaches /login, /logout, and /callback routes to the baseURL
    baseURL: 'http://localhost:3000',
    clientID: 'ev8ETDIXEDaJIegamsv7qcv4W6bhjkIB',
    issuerBaseURL: 'https://dev-1fh18kwa.eu.auth0.com',
    secret: 'NnPjYpct_ECmGgI6CvtBYQK9EV7YhnL9zPf8f4RzO0vMwYphEuNve_lPVUEdBPOO'
  }
};