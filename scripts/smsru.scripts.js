const config = require('../config/smsru.config');

module.exports.phonePostCode = async (phone) => {
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