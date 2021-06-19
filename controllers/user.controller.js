const { User } = require("../models")

module.exports.getUserByPhone = async function (phone, callback) {
  const query = { where: {phone: phone} };
  try {
    const user = await User.findOne(query);
    callback(null, user);
  } catch (err) {
    //console.log(err)
    //console.log(err.errors[0].type);
    callback(err, null);
    //console.log(err.errors[0].type == 'unique violation')
    //res.status(404).json({error: 'invalid json'});
    //res.status(404).json({error: err.errors[0].type});
    //return;
  }
}

module.exports.comparePass = function (passFromUser, userDBPass, callback) {
  if(passFromUser === userDBPass) {
    callback(null, true)
  } else
    callback(null, false)
}

module.exports.addUser = async function (query, callback) {
  try {
    await User.create(query)
  } catch (err) {
    //console.log(err)
    console.log(err.errors[0].type)
    callback(err, false)
    //console.log(err.errors[0].type == 'unique violation')
    //res.status(404).json({error: 'invalid json'});
    //res.status(404).json({error: err.errors[0].type});
    //return;
  }
  callback(null, true)
}