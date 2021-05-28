const express = require('express');
const router = express.Router();
const auth0config = require('./../config/auth0.config');

const { auth, requiresAuth } = require('express-openid-connect');
//const path = require('path');

//app.use(express.static(path.join(__dirname, '../adminPanel/build')));
router.use( auth(auth0config) );
// req.isAuthenticated is provided from the auth router
router.get('/',requiresAuth(), (req, res) => {
  //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
  res.send(JSON.stringify(req.oidc.user));
  //res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

module.exports = router;

