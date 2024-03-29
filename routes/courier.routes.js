const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

/*const { auth, requiresAuth } = require('express-openid-connect');
const auth0config = require('./../config/auth0.config');
router.use( auth(auth0config) );*/

const validateSchema = require("../middleware/validateSchema");
const Courier = require("../controllers/courier.controller");

////const { loginLimiter } = require("../middleware/rateLimitRedis");

const passport = require('passport');
////const jwt = require('jsonwebtoken');
////const jwtConfig = require("../config/jwt.config");

//////const authJwt = require('../middleware/authJwt');

const controller = require("../controllers/jwt.controller");
router.post("/refresh-token", controller.refreshToken);

router.get('/info',
  //passport.authenticate('jwt', {session: false}),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });

router.post('/create-new', validateSchema(
    ['phone', 'name', 'surname', 'patronymic', 'document', 'level', 'status', 'statusChangeTime', 'image', 'settings', 'extrainfo'],
    ["name", 'surname', "phone", "document" ] ),
    async (req, res) => {
  let body = req.body;

  body.document = await bcrypt.hash(body.document, 10);

  await Courier.addCourier(body, (err, status) => {
    if (status) {
      res.json({
        status: "success",
        message: "courier was added successfully"
      }); }
    if (err) {
      console.log(err)
      if(typeof err.errors === 'undefined') {
        console.log(err);
        res.status(404).json({
          error: "unhandled error",
          message: "unhandled error"
        });
      }
      else if (err.errors[0].type === 'unique violation')
        res.json({
          error: 'invalid unique violation',
          message: 'invalid unique violation'
        });
      else
        res.json({
          error: "unhandled error",
          message: err.errors
        });
    }
  })
  /*try {
    //await Courier.create(req.body,{fields: ['name', 'phone', 'document']})
    await Courier.create(req.body)
  } catch (err) {
    console.log(err)
    console.log(err.errors[0].type)
    //console.log(err.errors[0].type == 'unique violation')
    //res.status(404).json({error: 'invalid json'});
    res.status(404).json({error: err.errors[0].type});
    return;
  }
  console.log('Курьер был сохранён в БД');
  res.send(JSON.stringify({status: 'ok'}));*/
});

router.post('/login',
    validateSchema(['document', 'phone'],
        ['document', 'phone']),
    controller.signin);
/*router.post('/login',
    validateSchema(['document', 'phone'],
        ['document', 'phone']),
    loginLimiter,
    async (req, res) => {
  const phone = req.body.phone;
  const document = req.body.document;
  console.log(req.body);
  await Courier.getCourierByPhone(phone, async (err, courier) => {
    if(err) throw err
    if(!courier)
      return res.json({
        error: "incorrect data",
        message: "no courier with this data"
      });
    await Courier.comparePass(document, courier.document, (err, isMatch) => {
      if(err) throw err
      if(isMatch) {
        //console.log(user.toJSON());
        const accessToken = jwt.sign(courier.toJSON(), jwtConfig.ACCESS_TOKEN_SECRET, {
          expiresIn: 3600 * 24
        });
        const refreshToken = jwt.sign(courier.toJSON(), jwtConfig.REFRESH_TOKEN_SECRET, {
          expiresIn: 3600 * 24
        });

        res.json({
          status: 'success',
          token: token,//'JWT ' + token,
          courier: {
            phone: courier.phone,
            name: courier.name,
          }
        })
      } else
        res.json({
          error: "incorrect data",
          message: "incorrect courier document"
        });
    })
  })
});*/

router.post('/update-courier',
    validateSchema(["phone", 'level', 'status', 'statusChangeTime', 'image', 'settings', 'extrainfo'],
        ["phone"]),
    //passport.authenticate('jwt', {session: false}),
    async (req, res) => {
  console.log(req.body);
  //await Courier.getCourierByPhone(req.body.phone, (err, courier) => {
/*    if (err)
      res.status(404).json({
        error: "unhandled error",
        message: "unhandled error"
      });
    else if (!courier)
      res.status(404).json({
        error: "unhandled error",
        message: "phone error"
      });
    else {*/
      let changeCourierObj = {};
      ['level', 'status', 'statusChangeTime', 'image', 'settings', 'extrainfo']
          .forEach(key => changeCourierObj[key] = req.body[key]);

      await Courier.changeCourierInfo(req.body.user, changeCourierObj, (err, result) => {
      if (err)
        res.status(404).json({
          error: "unhandled error",
          message: "unhandled error"
        });
      else
        res.json({
          status: "success",
          message: "courier info was updated successfully"
        });
      })
    //}

  //})
});


router.post('/find-id', /*requiresAuth(),*/ validateSchema(  ['name', 'document', 'phone']),
    async (req, res) => {
  await Courier.findCourierIdByInfo(req.body, (err, id) => {
    if (err)
      res.status(404).json({
        error: "unhandled error",
        message: "unhandled error"
      });
    else
      res.json({
        status: "success",
        message: "courier id is " + id
      });
  })
});

router.post('/edit-by-admin', /*requiresAuth(),*/
    validateSchema(['id', 'phone', 'name', 'level', 'status', 'statusChangeTime', 'image', 'settings', 'extrainfo'],
        ['id']),
    async (req, res) => {
  console.log(req.body);
  await Courier.getCourierById(req.body.id, async (err, courier) => {
    if (err)
      res.status(404).json({
        error: "unhandled error",
        message: "unhandled error"
      });
    else {
      let changeCourierObj = {};
      ['phone', 'name', 'level', 'status', 'statusChangeTime', 'image', 'settings', 'extrainfo']
          .forEach(key => changeCourierObj[key] = req.body[key]);
      await Courier.changeCourierInfo(courier, changeCourierObj, (err, status) => {

      if (err)
        res.status(404).json({
          error: "unhandled error",
          message: "unhandled error"
        });
      else
        res.json({
          status: "success",
          message: "courier info was edited successfully"
        });
      })
    }
  })
});


module.exports = router;