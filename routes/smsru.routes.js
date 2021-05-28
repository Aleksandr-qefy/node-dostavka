const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

//const phonePostCode = require("./phonePostCode");
const validateSchema = require("../middleware/validateSchema");

const phonePostCode = async (phone) => {
  phone = phone.replace("+", "");
  //console.log(phone);
  const url = `https://smsc.ru/sys/send.php?login=${config.SMSRU_LOGIN}&psw=${config.SMSRU_PASSWORD}&phones=${phone}&mes=code&call=1&fmt=3`
  //const url = 'https://api.github.com/users/github';
  //console.log(url)
  let result;
  try {
    const res = await fetch(url);
    result = await res.json();
  } finally {
    return result
  }
}

router.post('/phone-code', validateSchema(['phone']), async (req, res) => {
  //console.log(req.body);
  const phonePostResult = await phonePostCode(req.body.phone);
  //console.log(phonePostResult);
  res.send( JSON.stringify(phonePostResult) );
  //res.send(JSON.stringify({status: 'ok'}));
});

module.exports = router;