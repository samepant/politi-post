const mongoose = require('mongoose');
const config = require('../config.js');
const Postcard = require('../models/postcardModel.js');
const fs = require('fs');
const path = require('path');

const currentPostcardFile = path.resolve('./static/postcards/currentPostcards.json');
const currentPostcardJSON = fs.readFileSync(currentPostcardFile);
const currentPostcards = JSON.parse(currentPostcardJSON);

let deleteCurrent = null;

if (process.argv[2] === 'deleteCurrent') {
  deleteCurrent = true;
} else {
  deleteCurrent = false;
}

//connect to mongoose 
mongoose.connect(config.mongoURI, function(err) {
  if(err) {
      console.log('connection error', err);
  }

  console.log(config.mongoURI,'connection successful');
  if (deleteCurrent) {
    mongoose.connection.db.dropCollection('postcardtemplates', function(err, result) {
      if (err) throw err;
      addPostcardsIfTheyDontExist(currentPostcards);
    });
  } else {
    addPostcardsIfTheyDontExist(currentPostcards);
  }
});

function addPostcardsIfTheyDontExist(postcardArray) {
  postcardArray.forEach( aPostcard => {
    Postcard.findOne({ 'backgroundURL': aPostcard['backgroundURL']}, 'message backgroundURL', function (err, postcard) {
      if (err) { 
        console.log(err);
      }  else if (!postcard) {
        console.log('no postcard found, so we are gonna add a new one:');
        const postcardToAdd = new Postcard(aPostcard);
        postcardToAdd.save( function (err, savedPostcard) {
            if (err) {
              throw err;
            }
            console.log(savedPostcard);
          }
        )
      } else {  
        console.log('no need to create, this postcard was found:',postcard);
      }
    })
  })
}