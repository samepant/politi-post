const secret = require('../secret.js');
const Lob = require('lob')(secret.lobAPIKey);
const fs = require('fs');

// Postcard templates 
const frontHtml  = fs.readFileSync(__dirname + '/postcard_front.html', { encoding: 'utf-8' });
const backHtmlTemplate   = fs.readFileSync(__dirname + '/postcard_back.html', { encoding: 'utf-8' });

module.exports = class Postcard {
  createPostcardPromise(postcardData, baseURL) {
    //need to regex replace the message cause Lob wasn't liking the html string
    const backHtml = backHtmlTemplate.replace(/{{message}}/g, postcardData.data.message);
    const imageURL = baseURL + postcardData.data.backgroundURL;
    return new Promise(
      function (resolve, reject) {
        Lob.postcards.create({
          to: postcardData.toAddress,
          from: postcardData.fromAddress,
          size: '4x6',
          front: frontHtml,
          back: backHtml,
          data: {
            backgroundURL: imageURL
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