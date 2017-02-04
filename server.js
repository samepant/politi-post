const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const LobPostcardMailer = require('./utilities/postcard.js');
const Postcard = require('./models/postcardModel.js');
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

//connect to mongoose 
mongoose.connect(config.mongoURI, function(err) {
  if(err) {
      console.log('connection error', err);
  }

  console.log(config.mongoURI,'connection successful');    

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
      console.log(stripeDescription);
      //make a stripe charge
      stripe.charges.create({
        amount: 110,
        currency: 'usd',
        source: stripeToken.id,
        description: stripeDescription
      }, function (err, charge) {
        if (err) {
          console.log(err);
          res.send(err);
        } else if (charge) {
          //send the postcard to Lob with this asynchronous function
          newPostcardToMail.createPostcardPromise(postcardData)
            .then(function (result) {
              res.send(result);
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

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  });

  console.log('server magic running on port/wand/tablet ' + port);
})
