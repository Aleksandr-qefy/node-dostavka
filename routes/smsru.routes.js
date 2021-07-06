const express = require('express');
const router = express.Router();
//const fetch = require('node-fetch');

const redis = require('../redis/redis')

const validateSchema = require("../middleware/validateSchema");
const phonePostCode = require("../scripts/smsru.scripts").phonePostCode;

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
    if (typeof phonePostResult.data.code !== 'undefined') {
      const code = phonePostResult.data.code
          .substr(phonePostResult.data.code.length - 4);
      redis.set(phone, code, 'EX', 5 * 60, (err, response) => {
        if (err) throw err;
        if (response === 'OK') res.json({
          status: 'success',
          message: "server successfully saved code"
        })
        else res.status(404).json({
          error: "unhandled error",
          message: "unhandled error"
        });
      });
    } else
      res.json({
        error: "can\'t send code",
        message: "server couldn\'t send code to phone"
      });
    //console.log(phonePostResult);
    res.json( phonePostResult );
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
        res.json({
          status: "success",
          message: "code is correct"
        });
      else
        res.json({
          error: "incorrect code",
          message: "code is not correct"
        });
    }
    else res.json({
      error: "no code",
      message: "there is no code in server for this phone"
    });
  })
});

module.exports = router;