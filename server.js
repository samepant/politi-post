const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const Postcard = require('./utilities/postcard.js');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.post('/postcard', (req, res) => {
    let response = req.body;
    const newPostcard = new Postcard();
    const postcardData = {
      toAddress: {
        name: 'Demo Annas',
        address_line1: '221 Montery St',
        address_line2: '',
        address_city: 'San Francisco',
        address_state: 'CA',
        address_zip: '94131',
        address_country: 'US'
      },
      fromAddress: {
        name: response.name,
        address_line1: response.address_line1,
        address_line2: response.address_line2,
        address_city: response.address_city,
        address_state: response.address_state,
        address_zip: response.address_zip,
        address_country: 'US'
      },
      message: response.message
    };
    /*
    newPostcard.message = response.message;
    
    newPostcard.toAddress = {
      name: 'Demo Annas',
      address_line1: '221 Montery St',
      address_line2: '',
      address_city: 'San Francisco',
      address_state: 'CA',
      address_zip: '94131',
      address_country: 'US'
    };
    newPostcard.fromAddress = {
      name: response.name,
      address_line1: response.address_line1,
      address_line2: response.address_line2,
      address_city: response.address_city,
      address_state: response.address_state,
      address_zip: response.address_zip,
      address_country: 'US'
    };
    */

    //send the postcard with this asynchronous function
    newPostcard.createPostcardPromise(postcardData)
      .then(function (result) {
        res.send(result);
      })
      .catch(function (reason) {
        console.error('Error or timeout', reason);
      })
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
