const express = require('express');
const router = express.Router();
const { getInn } = require('../scripts/service.nalog.ru.scripts');

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

module.exports = router;