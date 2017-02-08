const secret = require('../secret.js');
const config = require('../config.js');
const Lob = require('lob')(secret.lobAPIKey);
const fs = require('fs');

/* Example of functional Lob postcard creation */
const frontHtml  = fs.readFileSync(__dirname + '/postcard_front.html', { encoding: 'utf-8' });
const backHtml   = fs.readFileSync(__dirname + '/postcard_back.html', { encoding: 'utf-8' });

/* working example 
Lob.postcards.create({
  to: {
    name: 'sam pant',
    address_line1: '477 example rd',
    address_city: 'oakland',
    address_state: 'CA',
    address_zip: '94610',
    address_country: 'US'
  },
  from: {
    name: 'same',
    address_line1: '216 Test st',
    address_city: 'San Francisco',
    address_state: 'CA',
    address_zip: '94131',
    address_country: 'US'
  },
  size: '4x6',
  front: frontHtml,
  back: backHtml,
  data: {
    message: 'working message'
  }
}, function (err, postcard) {
  if (err) {
    return console.log(err);
  }
  console.log(postcard);
}
);
*/

module.exports = class Postcard {
  createPostcardPromise(postcardData) {
    return new Promise(
      function (resolve, reject) {
        Lob.postcards.create({
          to: postcardData.toAddress,
          from: postcardData.fromAddress,
          size: '4x6',
          //TODO get this to handle portrait vs landscape
          front: frontHtml,
          back: backHtml,
          data: {
            message: postcardData.data.message,
            backgroundURL: config.baseURL
          }
        }, function(err, postcard) {
          if (err) {
            reject(new Error(err));
          } 
          resolve(postcard);
        });
      }
    )
  }
}