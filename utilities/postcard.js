const secret = require('../secret.js');
const config = require('../config.js');
const Lob = require('lob')(secret.lobAPIKey);
const fs = require('fs');

// Postcard templates 
const frontHtml  = fs.readFileSync(__dirname + '/postcard_front.html', { encoding: 'utf-8' });
const backHtmlTemplate   = fs.readFileSync(__dirname + '/postcard_back.html', { encoding: 'utf-8' });

module.exports = class Postcard {
  createPostcardPromise(postcardData) {
    //need to regex replace the message cause Lob wasn't liking the html string
    const backHtml = backHtmlTemplate.replace(/{{message}}/g, postcardData.data.message);
    
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