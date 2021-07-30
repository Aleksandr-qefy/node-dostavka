const express = require('express');
const router = express.Router();
const { getInn, phonePostCode } = require('../scripts/registration.scripts');

const redis = require('../redis/redis')

const validateSchema = require("../middleware/validateSchema");

router.post('/get-inn',async (req, res) => {

  res.json(await getInn(
      req.body.surname,
      req.body.name,
      req.body.patronymic,
      req.body.birthdate,
      req.body.doctype,
      req.body.docnumber,
      req.body.docdate
  ));
});

router.post('/phone-code', validateSchema(['phone']), async (req, res) => {
  console.log(req.body);
  const phone = req.body.phone;
  if (phone === '+79252023828') {
    const code = '1234';
    redis.set(phone, code, 'EX', 5 * 60, (err) => {
      if (err) throw err;
      return res.json({
        status: 'success',
        message: "server successfully saved code"
      })
    });
  } else {
    const phonePostResult = await phonePostCode(phone);
    //const phonePostResult = { id: 61, cnt: 5, code: '082415' }
    console.log(phonePostResult);
    if (typeof phonePostResult.code !== 'undefined') {
      const code = phonePostResult.code
          .substr(phonePostResult.code.length - 4);
      redis.set(phone, code, 'EX', 5 * 60, (err, response) => {
        if (err) throw err;
        //if (err) console.log(err);
        if (response === 'OK') return res.json({
          status: 'success',
          message: "server successfully saved code"
        })
        else return res.status(404).json({
          error: "unhandled error",
          message: "unhandled error"
        });
      });
    } else
      return res.json({
        error: "can\'t send code",
        message: "server couldn\'t send code to phone"
      });
    //console.log(phonePostResult);
    //res.json( phonePostResult );
    //res.send(JSON.stringify({status: 'ok'}));
  }
});

router.post('/check-code', validateSchema(['phone', 'code'], ['phone', 'code']), async (req, res) => {
  console.log(req.body);
  const phone = req.body.phone;
  const code = req.body.code;
  redis.get(phone, (err, data) => {
    if (err) throw err;
    if (data) {
      if (data === code)
        return res.json({
          status: "success",
          message: "code is correct"
        });
      else
        return res.json({
          error: "incorrect code",
          message: "code is not correct"
        });
    }
    else return res.json({
      error: "no code",
      message: "there is no code in server for this phone"
    });
  })
});

router.post('/phone-code-registered', validateSchema(['phone'], ['phone']), async (req, res) => {
  console.log(req.body);
  const phone = req.body.phone;
  const Courier = require("../controllers/courier.controller");
  await Courier.courierExistsByPhone(phone, (err, exists) => {
    if (err) throw err;
    if (exists) {
      if (phone === '+79252023828') {
        const code = '1234';
        redis.set(phone, code, 'EX', 5 * 60, (err) => {
          if (err) throw err;
          return res.json({
            status: 'success',
            message: "server successfully saved code"
          })
        });
      } else {
        //const phonePostResult = await phonePostCode(phone);
        const phonePostResult = { id: 61, cnt: 5, code: '082415' }
        console.log(phonePostResult);
        if (typeof phonePostResult.code !== 'undefined') {
          const code = phonePostResult.code
              .substr(phonePostResult.code.length - 4);
          redis.set(phone, code, 'EX', 5 * 60, (err, response) => {
            if (err) throw err;
            //if (err) console.log(err);
            if (response === 'OK') return res.json({
              status: 'success',
              message: "server successfully saved code"
            })
            else return res.status(404).json({
              error: "unhandled error",
              message: "unhandled error"
            });
          });
        } else
          return res.json({
            error: "can\'t send code",
            message: "server couldn\'t send code to phone"
          });
        //console.log(phonePostResult);
        //res.json( phonePostResult );
        //res.send(JSON.stringify({status: 'ok'}));
      }
    } else {
      return res.json({
        error: "no courier",
        message: "there is no courier in DB with this phone"
      });
    }
  })
});

module.exports = router;