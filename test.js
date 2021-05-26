const fetch = require('node-fetch')
/*const body = {
  name: 'Test Testovicn Second',
  phone: '+79252023828',
  docno: '12 34 567890',
  extrainfo: {
    e: 'Hello',
    g: 'to World',
    u: 'from Node',
  }
};*/
/*const body = {
  id: '1',
  name: 'Test Testovicn Second',
  phone: '+71231231212',
  docno: '12 34 567890',
  extrainfo: {
    e: 'Hello',
    g: 'to World',
    u: 'from Node',
  }
};*/
const body = {
  phone: '+79252023828',
}

/*fetch('https://httpbin.org/post', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));*/
fetch('http://localhost:3000/phone-code', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));