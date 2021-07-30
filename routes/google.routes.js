const express = require('express');
const router = express.Router();

//const passport = require('passport');
//const { google } = require('googleapis');
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  //CALLBACK_URL
} = require('../config/google.auth0.config');
//const urlParse = require('url-parser');
//const queryParse = require('query-string');
//const cookies = require("cookie-parser");

/*router.get('/', (req, res) => {
    res.json({ status: 'success', path: '/courier/' });
});*/
/*router.get('/google/callback',
  (req, res, next) => {
    req.token = req.params.token;
    next();
  },
  passport.authenticate('google-profile', { failureRedirect: '/google-failure-redirect', session: false}),
  function(req, res) {
    // Successful authentication, redirect home.
    res.json({
      profile: req.user,
      token: req.token
    });
    console.log(req.user.id)
  });
  */
// router.get('/google-failure-redirect', (req, res) => {
//     res.json({ status: 'Failure redirect'});
// });
//localhost:3000/get-google-profile?token=6575
// router.get('/get-google-profile',
// (req, res, next) => {
//     req.token = req.query.token;
//     console.log(req.token);
//     next();
//   },
//     passport.authenticate('google-profile', { scope: ['profile'], session: false }),
//     /*(req, res) =>
// {
//   console.log('penis');
//   res.redirect('/google/ callback/' + req.params.token);
// }*/)
/*{
id: "107856824493205841040",
displayName: "Александр Хорс",
name: {
familyName: "Хорс",
givenName: "Александр"
},
photos: [
{
value: "https://lh3.googleusercontent.com/a/AATXAJzX7cMnVYu3kiSyxtHdRg0PtiBWsRPl-RSahaTG=s96-c"
}
],
provider: "google",
_raw: "{ "sub": "107856824493205841040", "name": "Александр Хорс", "given_name": "Александр", "family_name": "Хорс", "picture": "https://lh3.googleusercontent.com/a/AATXAJzX7cMnVYu3kiSyxtHdRg0PtiBWsRPl-RSahaTG\u003ds96-c", "locale": "ru" }",
_json: {
sub: "107856824493205841040",
name: "Александр Хорс",
given_name: "Александр",
family_name: "Хорс",
picture: "https://lh3.googleusercontent.com/a/AATXAJzX7cMnVYu3kiSyxtHdRg0PtiBWsRPl-RSahaTG=s96-c",
locale: "ru"
}
}*/
// router.get('/google/get-url', async(req, res) => {
//   const appToken = req.query.token
//   const oauth2Client = new google.auth.OAuth2(
//       GOOGLE_CLIENT_ID,
//       GOOGLE_CLIENT_SECRET,
//       CALLBACK_URL
//   );
// // const url = oauth2Client.generateAuthUrl({
// // 'online' (default) or 'offline' (gets refresh_token)
//    access_type: 'offline',
//  // If you only need one scope you can pass it as a string
//    scope: ["https://www.googleapis.com/auth/userinfo.email"]
//  });
//  console.log({ url });
  //return res.json({ url });
  //const url1 = await fetch(url);
   //console.log('url1: ',url1);
  //const response = await fetch(url1);
  //console.log('Result: ',response);
//  return res.json({ url });
  //{
  ////appToken: 'esfsefsegsegsegegthrsg'
  // }
  //req.params.app_token
  //res.redirect(url);
//});
//router.get('/google/callback', async function(req, res) {
    // Successful authentication, redirect home.
  //const queryUrl = urlParse(req.url);
  //const code = queryParse.parse(queryUrl.query).code;
//  console.log(req.query)
//  const code = req.query.code
  // const oauth2Client = new google.auth.OAuth2(
  //     GOOGLE_CLIENT_ID,
  //     GOOGLE_CLIENT_SECRET,
  //     CALLBACK_URL
  // );
  // const tokens = await oauth2Client.getToken(code);
  // console.log({ tokens });
  // try {
  //   const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+tokens.tokens.access_token)
  //   const result = await response.json();
  //   /*, {
  //     method: 'get',
//        body:    JSON.stringify(body),
      // headers: {
      //   authorization: 'Bearer ' + tokens.tokens.access_token
      // },
      // 'Content-Type': 'application/json'
    // })*/
    // /*return res.json({
    //   profile: result,
    //   appToken: req.query.token
    // });*/
    // console.log(result);
    // res.cookie('googleAccountProfile', JSON.stringify(result))
    // res.redirect('http://localhost:8100/login');
  // } catch (err) {
  //   throw err
  // }
// });

router.post('/google/verify-google-token', async (req, res) => {
    /*try {
        const tokenDecodedData = jsonWebToken.verify(req.body.id_token, 'FAQRGbMQJETf5O76LyF3FdxK');
        return res.json({
            status: 'success',
            data: tokenDecodedData
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }*/
  const {OAuth2Client} = require('google-auth-library');

  try {
    const client = new OAuth2Client(GOOGLE_CLIENT_SECRET);
    const ticket = await client.verifyIdToken({
      idToken: req.body.id_token,
      audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    return res.json({
      status: 'success',
      id: userid,
      data: payload
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
    // If request specified a G Suite domain:
    // const domain = payload['hd'];

})
module.exports = router;