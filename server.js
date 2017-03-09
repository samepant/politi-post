const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const LobPostcardMailer = require('./utilities/postcard.js');
const Postcard = require('./models/postcardModel.js');
const SentPostcard = require('./models/sentPostcardModel.js');
const confirmationEmailer = require('./utilities/emailConfirmation.js');
//const Legislator = require('.models/repAndSenModel.js');
const mongoose = require('mongoose');
const config = require('./config.js');
const secret = require('./secret.js');
const stripe = require('stripe')(secret['stripeTestSecret']);
const moment = require('moment-timezone');
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000; 
const app = next({ dev });
const handle = app.getRequestHandler();
let baseURL = null;
let mongoURI = null;

if (process.env.NODE_ENV == 'production') {
  baseURL = config['baseURLProd'];
  mongoURI = secret['mongoURI'];
} else {
  baseURL = config['baseURLDev'];
  mongoURI = config['mongoURI'];
}
console.log(baseURL);

//connect to mongoose 
mongoose.connect(mongoURI, function(err) {
  if(err) {
      console.log('connection error', err);
  }

  console.log(mongoURI,'connection successful');    

});

app.prepare()
.then(() => {
  const server = express();
  const router = express.Router();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  //router middleware goes here (verification, logging, etc)
  router.use(function(req, res, next) {
    console.log('something is happening');
    next();
  });

  router.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });   
  });

  router.route('/postcards')
    //create
    .post((req, res) => {
      let request = req.body;
      const newPostcardToMail = new LobPostcardMailer();
      const stripeToken = request.stripeToken;
      const momentCreated = moment.unix(stripeToken.created).tz('America/Los_Angeles').format("dddd, MMMM Do YYYY, h:mm:ss a");
      const stripeDescription = `postcard created by ${stripeToken.email} at ${momentCreated}`
      const postcardData = {
        toAddress: request.to,
        fromAddress: request.from,
        data: request.data
      };

      //make a stripe charge
      stripe.charges.create({
        amount: 150,
        currency: 'usd',
        source: stripeToken.id,
        description: stripeDescription
      }, function (err, charge) {
        if (err) {
          console.log(err);
          res.send(err);
        } else if (charge) {
          //send the postcard to Lob with this asynchronous function
          newPostcardToMail.createPostcardPromise(postcardData, baseURL)
            .then(function (result) {
              const response = {
                expectedDelivery: result.expected_delivery_date,
                email: stripeToken.email,
                postcardLink: result.url
              };
              //send client the response
              res.send(response);

              //create record in the DB that a postcard was sent
              const sentPostcard = new SentPostcard();
              sentPostcard['lobID'] = result.id;
              sentPostcard['senderEmail'] = stripeToken.email;
              sentPostcard['dateCreated'] = momentCreated;
              sentPostcard['expectedDeliveryDate'] = result.expected_delivery_date;
              sentPostcard['postcardURL'] = result.url;
              sentPostcard['sentTo'] = {
                name: result.to['name'],
                address_line1: result.to['address_line1'],
                address_line2: result.to['address_line2'],
                address_city: result.to['address_city'],
                address_state: result.to['address_state'],
                address_zip: result.to['address_zip']
              };

              sentPostcard.save( err => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(stripeDescription);
                }

              })

              //send confirmation email to postcard sender
              const emailer = new confirmationEmailer();
              emailer.createConfirmationEmailPromise(stripeToken.email, result)
                .then(result => {
                  console.log('email sent to ' + stripeToken.email);
                })
                .catch(reason => {
                  console.error('Error or timeout', reason);
                })
            })
            .catch(function (reason) {
              console.error('Error or timeout', reason);
            })
        }
      })
    })
    .get((req, res) => {
      Postcard.find(function(err, postcards) {
        if (err) res.send(err);
        const objectifiedPostcards = {
          postcards: postcards
        }
        res.json(objectifiedPostcards);
      })
    })

  //get a single postcard template
  router.route('/postcards/:postcard_id')
    .get((req, res) => {
      Postcard.findById(req.params.postcard_id, function(err, postcard) {
        if (err) res.send(err);
        res.json(postcard)
      });
    });

  //get a single legislator THIS IS NOT TOTALLY WORKING/DOES NOT REFLECT WHAT'S IN THE DB
  router.route('/legislators/:bioguide_id')
    .get((req, res) => {
      Postcard.findOne({'bio_guide': req.params.bioguide_id}, function(err, legislator) {
        if (err) res.send(err);
        res.json(legislator)
      });
    });

  server.use('/api', router);

  server.get('/.well-known/acme-challenge/Urc6C-H6AMnQ7omXZEavUhhcFHzsCYkecvUnIEVsqCg', (req, res) => {
    res.send('Urc6C-H6AMnQ7omXZEavUhhcFHzsCYkecvUnIEVsqCg.NTqNjHH4m6yJH_6zyn5squEw4VJeyM3y-glsMl-FFCs');
  });

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  });

  console.log('server magic running on port/wand/tablet ' + port);
})
