const express = require("express");
const app = express();
const db = require("./models");
//const config = require('./config.js');

app.set('trust proxy', 1);


let bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '150kb'}));

const cors = require('cors');
app.use(cors({
  origin: ['http://192.168.0.104:8100','http://localhost:8100', 'http://localhost:8101', 'http://192.168.0.103:8101', 'http://192.168.0.107:8100','http://192.168.0.103:8100'],
  methods: ['GET', 'POST'],
  //'Access-Control-Allow-Origin: *'
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

//const validateSchema = require("./middleware/validateSchema");

//const passport = require('passport')
//app.use( passport.initialize() )
//app.use( passport.session() )

//require("./passport/passport")(passport);

/*const redis = require("redis");
const redisClient = redis.createClient({
  retry_strategy: function(options) {
    if (options.error && options.error.code === "ECONNREFUSED") {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error("The server refused the connection");
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error("Retry time exhausted");
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  },
});*/
/*client.on("error", function(error) {
  console.error(error);
});*/
/*
const { promisify } = require("util");
const GET_ASYNC = promisify(redisClient.get).bind(redisClient);
const SET_ASYNC = promisify(redisClient.set).bind(redisClient);
const DEL_ASYNC = promisify(redisClient.del).bind(redisClient);
const r1 = await SET_ASYNC("key", "value");
const r2 = await GET_ASYNC("key");
const r3 = await DEL_ASYNC("key");
*/

/*redisClient.set("key", "value", (err, response) => {
  if (err) throw err;
  if (response) console.log(response);
});
redisClient.get("key", (err, response) => {
  if (err) throw err;
  if (response) console.log(response);
});
redisClient.del("key", (err, response) => {
  if (err) throw err;
  if (response) console.log(response);
});*/

app.use('/', require('./routes/admin.routes'));
app.use('/courier', require('./routes/courier.routes'));
//app.use('/', require('./routes/smsru.routes'));
//app.use('/service-nalog-ru', require('./routes/service.nalog.ru.routes'));
app.use('/registration', require('./routes/registration.routes'));
app.use('/', require('./routes/google.routes'));

const { registrationLimiter } = require("./middleware/rateLimitRedis");
//app.use("/courier/", courierLimiter);
app.use("/registration/", registrationLimiter);

app.get('/', (req, res) => {
  res.send('pong');
  //res.send(JSON.stringify(req.oidc.user))
});


//const adminRouter = require("./adminRouter");
//app.use('/admin', adminRouter);


app.all('*', function(req, res){
  res.status(404).send('My Error');
});

const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(async (req) => {

  app.listen(PORT, () => {
    /*console.log(
        `Server is running localhost:${PORT} \nLogin AdminPanel is under localhost:${PORT}/admin`)*/
    console.log(`Server is running localhost:${PORT}`);
    console.log(`localhost:${PORT}/google/get-url/715`);
    console.log(`Login AdminPanel is under localhost:${PORT}/admin/dashboard localhost:${PORT}/localhost:3000/admin/info`);
    console.log(`Log Out AdminPanel is under localhost:${PORT}/admin/logout`);
  });
})
