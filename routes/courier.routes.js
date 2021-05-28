const express = require('express');
const router = express.Router();

const { Courier } = require("./../models");
const validateSchema = require("../middleware/validateSchema");

router.post('/find-id', validateSchema(  ['name', 'document', 'phone']), async (req, res) => {
  try {
    //await Courier.create(req.body)
    const courier = await Courier.findByPk(req.body.id);

    if (courier === null) {
      res.status(404).json({error: 'There is no such ID'});
      console.log('There is no such ID');
    } else {
      await Courier.update(req.body, {
        where: {
          id: req.body.id
        }
      });
      res.send(JSON.stringify({status: 'ok'}));
    }
  } catch (err) {
    //console.log(err)
    console.log(err.errors[0].type)
    //console.log(err.errors[0].type == 'unique violation')
    //res.send( JSON.stringify({error: 'invalid json'}) )
    res.status(404).json(err.errors[0].type);
    return;
  }
  res.send(JSON.stringify({status: 'ok'}));
});

router.post('/create-new', validateSchema(
    ['phone', 'name', 'document', 'level', 'status', 'statusChangeTime', 'image', 'settings', 'extrainfo'],
    ["name", "phone", "document"] ),
    async (req, res) => {
  console.log(req.body);
  try {
    await Courier.create(req.body/*,{fields: ['name', 'phone', 'document']}*/)
  } catch (err) {
    console.log(err)
    console.log(err.errors[0].type)
    //console.log(err.errors[0].type == 'unique violation')
    //res.status(404).json({error: 'invalid json'});
    res.status(404).json({error: err.errors[0].type});
    return;
  }
  console.log('Курьер был сохранён в БД');
  res.send(JSON.stringify({status: 'ok'}));
});
router.post('/edit',
    validateSchema(['id', 'phone', 'name', 'level', 'status', 'statusChangeTime', 'image', 'settings', 'extrainfo'],
        ['id']),
    async (req, res) => {
  console.log(req.body);
  try {
    //await Courier.create(req.body)
    const courier = await Courier.findByPk(req.body.id);

    if (courier === null) {
      res.status(404).json({error: 'There is no such ID'});
      console.log('There is no such ID');
    } else {
      await Courier.update(req.body, {
        where: {
          id: req.body.id
        }
      });
      res.send(JSON.stringify({status: 'ok'}));
    }
  } catch (err) {
    //console.log(err)
    console.log(err.errors[0].type)
    //console.log(err.errors[0].type == 'unique violation')
    //res.send( JSON.stringify({error: 'invalid json'}) )
    res.status(404).json(err.errors[0].type);
    return;
  }
  res.send(JSON.stringify({status: 'ok'}));
});

module.exports = router;