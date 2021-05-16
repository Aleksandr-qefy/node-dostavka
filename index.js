const express = require("express");
const app = express();

let bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '150kb'}));

const adminRouter = require("./adminRouter");
app.use('/admin', adminRouter);

const db = require("./models");
const { Courier } = require("./models");

const validateSchema = require("./validateSchema");
const { schemaNewCourier, schemaEditCourier, jsonKeysEditCourier } = require("./schemas");

app.post('/create-new-courier', validateSchema(schemaNewCourier), async (req, res) => {
  console.log(req.body);
  try {
    await Courier.create(req.body/*,{fields: ['name', 'phone', 'document']}*/)
  } catch (err) {
    console.log(err)
    console.log(err.errors[0].type)
    console.log(err.errors[0].type == 'unique violation')
    //res.send( JSON.stringify({error: 'invalid json'}) )
    res.status(404).json({error: 'invalid json'});
    return;
  }
  console.log('Курьер был сохранён в БД');
  res.send(JSON.stringify({status: 'ok'}));
});

app.post('/edit-courier', validateSchema(schemaEditCourier, jsonKeysEditCourier), async (req, res) => {
  console.log(req.body);
  /*try {
    await Courier.create(req.body)
  } catch (err) {
    console.log(err)
    console.log(err.errors[0].type)
    console.log(err.errors[0].type == 'unique violation')
    //res.send( JSON.stringify({error: 'invalid json'}) )
    res.status(404).json({error: 'invalid json'});
    return;
  }*/
  //console.log('Курьер был сохранён в БД');
  res.send(JSON.stringify({status: 'ok'}));
});

app.all('*', function(req, res){
  res.send('Error', 404);
});

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(async (req) => {

  app.listen(PORT, () => {
    console.log(
        `Server is running localhost:${PORT} \nAdminBro is under localhost:${PORT}/admin`)
  });
})
