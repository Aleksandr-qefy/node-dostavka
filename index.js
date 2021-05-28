const express = require("express");
const app = express();
const db = require("./models");
//const config = require('./config.js');

let bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '150kb'}));

//const validateSchema = require("./middleware/validateSchema");


app.use('/admin', require('./routes/admin.routes'));
app.use('/courier', require('./routes/courier.routes'));
app.use('/', require('./routes/smsru.routes'));

app.get('/', (req, res) => {
  res.send('pong');
  //res.send(JSON.stringify(req.oidc.user))
});


//const adminRouter = require("./adminRouter");
//app.use('/admin', adminRouter);


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
