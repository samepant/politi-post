const secret = require('../secret.js');
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: secret.nodemailerSecretKey,
    domain: 'mg.congresscard.club'
  }
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

module.exports = class Emailer {
  createConfirmationEmailPromise (emailAddress, lobResponse) {
    const messageHTML = `<p>Hi ${lobResponse.from.name}!</p><p>You've sent a postcard using <a href='https://www.congresscard.club'>congresscard.club</a>.</p><p><a href="${lobResponse.url}">You sent this postcard to ${lobResponse.to.name}</a></p>`;
    const mailOptions = {
      from: 'notifications@congresscard.club',
      to: emailAddress,
      subject: 'You\'ve sent a postcard!',
      html: messageHTML, 
    };

    return new Promise (
      function (resolve, reject) {
        nodemailerMailgun.sendMail(mailOptions, (err, res) => {
          if (err) {
            reject(new Error(err));
          } else {
            resolve(res);
          }
        });
      }
    );
  } 
}

