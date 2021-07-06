const { Courier } = require("../models");
const bcrypt = require('bcrypt');

module.exports.changeCourierInfo = async function (courier, changesObject, callback) {
  //Object.assign(courier, changesObject)
  const keysArray = Object.keys(changesObject);

  try {
    keysArray.forEach(key => {
      courier[key] = changesObject[key];
    });
    await courier.save();
    callback(null, true);
  } catch (err) {
    callback(err, false);
  }
}

module.exports.getCourierByPhone = async function (phone, callback) {
  const query = { where: {phone: phone} };
  try {
    const courier = await Courier.findOne(query);
    callback(null, courier);
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

module.exports.getCourierById = async function (id, callback) {
  //const query = { where: {phone: phone} };
  try {
    const courier = await Courier.findOne(id);
    callback(null, courier);
  } catch (err) {
    callback(err, null);
  }
}

module.exports.comparePass = async function (passFromUser, userDBPassHash, callback) {
  try {
    const validPass = await bcrypt.compare(passFromUser, userDBPassHash);
    if(validPass) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  } catch (err) {
    callback(err, null);
  }
}

module.exports.findCourierIdByInfo = async function (infoObj, callback) {
  const query = { where: infoObj };
  try {
    const courier = await Courier.findOne(query);
    callback(null, courier.id);
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

module.exports.addCourier = async function (query, callback) {
  try {
    await Courier.create(query);
    callback(false, true)
  } catch (err) {
    //console.log(err)
    console.log(err.errors[0].type)
    callback(err, false)
    //console.log(err.errors[0].type == 'unique violation')
    //res.status(404).json({error: 'invalid json'});
    //res.status(404).json({error: err.errors[0].type});
    //return;
  }
}