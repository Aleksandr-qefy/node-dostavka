const schemaNewCourier = {
  "id": "/NewCourier",
  "type": "object",
  "properties": {
    "name": {"type": "string"},
    "phone": {"type": "string"},
    "document": {"type": "string"},
    //"votes": {"type": "integer", "minimum": 1}
  },
  "maxProperties": 3,
  "required": ["name", "phone", "document"]
};
module.schemaNewCourier = schemaNewCourier

/*const schemaEditCourier = {
  "id": "/NewCourier",
  "type": "object",
  "properties": {
    "id": {"type": "string"},
    "name": {"type": "string"},
    "phone": {"type": "string"},
    "document": {"type": "string"},
    "level": {"type": "number"},
    "status": {"type": "string"},
    "statusChangeTime": {"type": "string"},
    "image": {"type": "string"},
    "settings": {"type": "string"},
    "extrainfo": {"type": "string"},
    //"votes": {"type": "integer", "minimum": 1}
  },
  //"maxProperties": 3,
  "required": ["id"]//обязательно должен быть id
};
module.schemaEditCourier = schemaEditCourier*/

const jsonKeysEditCourier = [
    'id', 'phone', 'name', 'document', 'level', 'status', 'statusChangeTime', 'image', 'settings', 'extrainfo'
];
module.jsonKeysEditCourier = jsonKeysEditCourier

const schemaPhoneCode = {
  "id": "/PhoneCode",
  "type": "object",
  "properties": {
    "phone": {"type": "string"},
  },
  "maxProperties": 1,
  "required": ["phone"]//обязательно должен быть id
};
module.schemaPhoneCode = schemaPhoneCode