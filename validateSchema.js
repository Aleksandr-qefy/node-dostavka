const validate = require('jsonschema').validate;

const validateSchema = (schemaName, approvedJsonKeys) => {
  return (req, res, next) => {
    let result = validate(req.body, schemaName);
    //console.log(result)
    console.log('valid',result.valid);
    let difference = [];
    if(approvedJsonKeys) difference = Object.keys(req.body).filter(num => !approvedJsonKeys.includes(num));
    console.log(difference);
    if (result.valid && difference.length == 0) {
      next()
    } else {
      //return res.send(errorResponse(ajv.errors))
      //res.send( JSON.stringify({error: 'invalid json'}) )
      res.status(404).json({error: 'invalid json'})
    }
  }
}

module.exports = validateSchema