const express = require("express");
const app = express();
const config = require('./config.js');

const { auth, requiresAuth } = require('express-openid-connect');
app.use( auth(config.auth0config) );

// req.isAuthenticated is provided from the auth router
app.get('/admin',requiresAuth(), (req, res) => {
  //res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
  res.send(JSON.stringify(req.oidc.user));
});

app.get('/', (req, res) => {
  //res.send(JSON.stringify(req.oidc.user))
  res.send(req.oidc.isAuthenticated() ? 'You are logged in' : 'You are logged out');
});

let bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '150kb'}));

//const adminRouter = require("./adminRouter");
//app.use('/admin', adminRouter);

const db = require("./models");
const { Courier } = require("./models");

const validateSchema = require("./validateSchema");
const { schemaNewCourier,
  //schemaEditCourier,
  jsonKeysEditCourier,
  schemaPhoneCode } = require("./schemas");

app.post('/create-new-courier', validateSchema(schemaNewCourier), async (req, res) => {
  console.log(req.body);
  try {
    await Courier.create(req.body/*,{fields: ['name', 'phone', 'document']}*/)
  } catch (err) {
    console.log(err)
    console.log(err.errors[0].type)
    //console.log(err.errors[0].type == 'unique violation')
    //res.status(404).json({error: 'invalid json'});
    res.status(404).json({error: err.errors[0].type});
    return;
  }
  console.log('Курьер был сохранён в БД');
  res.send(JSON.stringify({status: 'ok'}));
});

app.post('/edit-courier',
    () => { return (req, res, next) => {
      if(req.body.id && !req.body.document) {
        next()
      } else {
        res.status(404).json({error: 'invalid json'})
      }
    }},
    validateSchema(undefined, jsonKeysEditCourier),
    async (req, res) => {
  console.log(req.body);
  try {
    //await Courier.create(req.body)
    const courier = await Courier.findByPk(req.body.id);

    if (courier === null) {
      res.status(404).json({error: 'There is no such ID'});
      console.log('There is no such ID');
    } else {
      await Courier.update(req.body, {
        where: {
          id: req.body.id
        }
      });
      res.send(JSON.stringify({status: 'ok'}));
    }
  } catch (err) {
    //console.log(err)
    console.log(err.errors[0].type)
    //console.log(err.errors[0].type == 'unique violation')
    //res.send( JSON.stringify({error: 'invalid json'}) )
    res.status(404).json(err.errors[0].type);
    return;
  }
  res.send(JSON.stringify({status: 'ok'}));
});

const phonePostCode = require("./phonePostCode");
app.post('/phone-code', validateSchema(schemaPhoneCode), async (req, res) => {
  //console.log(req.body);
  const phonePostResult = await phonePostCode(req.body.phone);
  //console.log(phonePostResult);
  res.send( JSON.stringify(phonePostResult) );
  //res.send(JSON.stringify({status: 'ok'}));
});

app.all('*', function(req, res){
  res.send('Error', 404);
});

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(async (req) => {

  app.listen(PORT, () => {
    console.log(
        `Server is running localhost:${PORT} \nLogin AdminPanel is under localhost:${PORT}/admin`)
  });
})
