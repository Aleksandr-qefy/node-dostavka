const express = require('express');
const router = express.Router();

const { auth, requiresAuth } = require('express-openid-connect');
const auth0config = require('./../config/auth0.config');
router.use( auth(auth0config) );

const validateSchema = require("../middleware/validateSchema");
const Courier = require("../controllers/courier.controller");

const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/info',
  passport.authenticate('jwt', {session: false}),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });

router.post('/create-new', validateSchema(
    ['phone', 'name', 'document', 'level', 'status', 'statusChangeTime', 'image', 'settings', 'extrainfo'],
    ["name", "phone", "document"] ),
    async (req, res) => {
  console.log(req.body);
  await Courier.addCourier(req.body, (err, status) => {
    if(typeof err.errors == 'undefined')
      res.status(404).json({
        error: "unhandled error",
        message: "unhandled error"
      });
    else if (err.errors[0].type !== 'unique violation')
      res.json({
        error: 'invalid unique violation',
        message: 'invalid unique violation'
      });
    else if (err) {
      res.status(404).json({
        error: "unhandled error",
        message: err.errors
      });
      throw err.errors;
    }
    else
      res.json({
        status: "success",
        message: "courier was added successfully"
      });
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
    async (req, res) => {
  const phone = req.body.phone;
  const document = req.body.document;
  console.log(req.body);
  await Courier.getCourierByPhone(phone, async (err, courier) => {
    if(err) throw err
    if(!courier)
      return res.json({
        error: "Такой пользователь не был найден",
        message: "Такой пользователь не был найден"
      });
    await Courier.comparePass(document, courier.document, (err, isMatch) => {
      if(err) throw err
      if(isMatch) {
        //console.log(user.toJSON());
        const token = jwt.sign(courier.toJSON(), 'secret', {
          expiresIn: 3600 * 24
        });

        res.json({
              token: 'JWT ' + token,
              courier: {
                phone: courier.phone,
                name: courier.name,
              }
            })
      } else
        res.json({
          error: "Неправильный номер и снрия документа",
          message: "Неправильный номер и снрия документа"
        });
    })
  })
});

router.post('/update-courier',
    validateSchema(["phone", 'level', 'status', 'statusChangeTime', 'image', 'settings', 'extrainfo'],
        ["phone"]),
    passport.authenticate('jwt', {session: false}),
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


router.post('/find-id', requiresAuth(), validateSchema(  ['name', 'document', 'phone']),
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

router.post('/edit-by-admin', requiresAuth(),
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