const fetch = require('node-fetch');
const auth0config = require('./../config/auth0.config');
//const mgmtApiAccessToken = require('./../config/mgmtApiAccessToken');

module.exports = (/*rolesArray*/) => {
  //rolesArray = rolesArray || [];
  return async (req, res, next) => {
    if (req.oidc.isAuthenticated()) {
      next();
      /*
      console.log(req.oidc.user.sub);

      const options = {
        method: 'GET',
        //url: ,
        headers: {authorization: `Bearer ${mgmtApiAccessToken}`}
      };
      const url = `${auth0config.issuerBaseURL}/api/v2/users/${req.oidc.user.sub}/roles`;

      const result = await fetch(url, options);
      const body = await result.json();
      console.log(req.oidc.user)
      //const role =

      console.log(body[0].name)

      if(rolesArray.length === 0) {
        //req.oidc.user.user = role;
        next();
      } else if (rolesArray.indexOf( body[0].name ) !== -1){
        //req.oidc.user.user = role;
        next();
      } else {
        res.status(401).json({error: 'You don\`t have permission'});
      }*/
    } else {
      //return res.send(errorResponse(ajv.errors))
      //res.send( JSON.stringify({error: 'invalid json'}) )
      res.status(401).json({error: 'You are logged out'});
    }
  }
}