const express = require("express");
const app = express();
const db = require("./models");
//const config = require('./config.js');

let bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '150kb'}));

//const validateSchema = require("./middleware/validateSchema");

const passport = require('passport')
const jwt = require('jsonwebtoken')
app.use( passport.initialize() )
app.use( passport.session() )

require("./passport/passport")(passport);

app.use('/', require('./routes/admin.routes'));
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
    /*console.log(
        `Server is running localhost:${PORT} \nLogin AdminPanel is under localhost:${PORT}/admin`)*/
    console.log(`Server is running localhost:${PORT}`);
    console.log(`Login AdminPanel is under localhost:${PORT}/admin/dashboard localhost:${PORT}/localhost:3000/admin/info`);
    console.log(`Log Out AdminPanel is under localhost:${PORT}/admin/logout`);
  });
})
