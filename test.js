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
const body = {
  id: '1',
  name: 'Test Testovicn Second',
  phone: '+71231231212',
  docno: '12 34 567890',
  extrainfo: {
    e: 'Hello',
    g: 'to World',
    u: 'from Node',
  }
};

/*fetch('https://httpbin.org/post', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));*/
fetch('http://localhost:5000/change-courier-info', {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));