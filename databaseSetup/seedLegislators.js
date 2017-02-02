const mongoose = require('mongoose');
const config = require('../config.js');
const RepAndSen = require('../models/repAndSenModel.js');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const legisAPI = 'https://congress.api.sunlightfoundation.com/legislators?';

const filetoProcess = path.join(__dirname, process.argv[2]);
const isSenator = process.argv[3];

//make sure command line arguments are there
if (!isSenator ) {
  console.log('you need to pass in a file and a "yes" or a "no" \n yes if the file contains a list of senators and a no if it\'s a list of representatives');
  process.exit();  
}

const content = fs.readFileSync(filetoProcess);
const jsonContent = JSON.parse(content);

//connect to mongoose 
mongoose.connect(config.mongoURI, function(err) {
  if(err) {
      console.log('connection error', err);
  }

  console.log(config.mongoURI,'connection successful');

  seedDatabase(jsonContent);     

});

function seedDatabase (json) {

  for (var i = 0; i < json.length; i++) {
    let currentItem = json[i];
    let itemToBeSaved = {};

    //we only need to parse the city, state zip
    let districtParsed = parseAddress(currentItem['District Address Line 3']);


    //set name
    itemToBeSaved['last_name'] = currentItem['last_name'];
    itemToBeSaved['first_name'] = currentItem['first_name'];

    //set district address
    itemToBeSaved['district_address_1'] = currentItem['District Address Line 1']; 
    itemToBeSaved['district_address_2'] = currentItem['District Address Line 2'];
    
    //if state string is > than 2 letters swap it for the appropriate state code
    if (districtParsed.state.length > 2) {
      itemToBeSaved['district_address_state'] = states[districtParsed.state];
    } else {
      itemToBeSaved['district_address_state'] = districtParsed.state;
    }
    
    //this is how we need addresses formatted for Lob
    itemToBeSaved['district_address_city'] = districtParsed.city;
    itemToBeSaved['district_address_zip'] = districtParsed.zip;

    //set DC address
    itemToBeSaved['dc_address'] = currentItem['DC Address'];
    itemToBeSaved['dc_city'] = 'Washington';
    itemToBeSaved['dc_state'] = 'DC';
    itemToBeSaved['dc_zip'] = currentItem['DC Zip'];

    //set party affiliation
    itemToBeSaved['party'] = currentItem['party'];

    //set is senator
    if (isSenator === 'yes') {
      itemToBeSaved['senator'] = true;
    } else {
      itemToBeSaved['senator'] = false;
    }

    //get bioID from sunlightLabs' API
    let queryString = legisAPI  + '&state=' + itemToBeSaved['district_address_state'] + 'last_name=' + itemToBeSaved['last_name'];
    
    axios.get(queryString)
      .then( response => {
        const apiResponse = response.data.results;
        if (apiResponse.length > 1) {
          //this is very unlikely but i'd like to know if there is more than one legislator with the same last name from the same state
          console.log('UH OH multiple resluts found for ' + itemToBeSaved['last_name'], apiResponse);
        } else if (apiResponse[0] === undefined) {
          console.log( itemToBeSaved['last_name'], response.data);
        } else {
          const bioID = apiResponse[0]['bioguide_id'];
          itemToBeSaved['bio_guide'] = bioID;
        }
      })
      .catch( error => {
        console.log(error);
      });

    const newRepAndSen = new RepAndSen(itemToBeSaved);

    newRepAndSen.save( function (err, savedRepAndSen) {
      if (err) throw err;

      console.log(savedRepAndSen);
    }); 

  }
}

//function to parse 'city, state zip' thanks to tylermwashburn on SO
function parseAddress(address) {
    // Make sure the address is a string.
    if (typeof address !== 'string') throw 'Address is not a string.';

    // Trim the address.
    address = address.trim();

    // Make an object to contain the data.
    var returned = {};

    // Find the comma.
    var comma = address.indexOf(',');

    // Pull out the city.
    returned.city = address.slice(0, comma);

    // Get everything after the city.
    var after = address.substring(comma + 2); // The string after the comma, +2 so that we skip the comma and the space.

    // Find the space.
    var space = after.lastIndexOf(' ');

    // Pull out the state.
    returned.state = after.slice(0, space);

    // Pull out the zip code.
    returned.zip = after.substring(space + 1);

    // Return the data.
    return returned;
}

const states = { Alabama: 'AL',
  Alaska: 'AK',
  'American Samoa': 'AS',
  Arizona: 'AZ',
  Arkansas: 'AR',
  California: 'CA',
  Colorado: 'CO',
  Connecticut: 'CT',
  Delaware: 'DE',
  'District Of Columbia': 'DC',
  'Federated States Of Micronesia': 'FM',
  Florida: 'FL',
  Georgia: 'GA',
  Guam: 'GU',
  Hawaii: 'HI',
  Idaho: 'ID',
  Illinois: 'IL',
  Indiana: 'IN',
  Iowa: 'IA',
  Kansas: 'KS',
  Kentucky: 'KY',
  Louisiana: 'LA',
  Maine: 'ME',
  'Marshall Islands': 'MH',
  Maryland: 'MD',
  Massachusetts: 'MA',
  Michigan: 'MI',
  Minnesota: 'MN',
  Mississippi: 'MS',
  Missouri: 'MO',
  Montana: 'MT',
  Nebraska: 'NE',
  Nevada: 'NV',
  'New Hampshire': 'NH',
  'New Jersey': 'NJ',
  'New Mexico': 'NM',
  'New York': 'NY',
  'North Carolina': 'NC',
  'North Dakota': 'ND',
  'Northern Mariana Islands': 'MP',
  Ohio: 'OH',
  Oklahoma: 'OK',
  Oregon: 'OR',
  Palau: 'PW',
  Pennsylvania: 'PA',
  'Puerto Rico': 'PR',
  'Rhode Island': 'RI',
  'South Carolina': 'SC',
  'South Dakota': 'SD',
  Tennessee: 'TN',
  Texas: 'TX',
  Utah: 'UT',
  Vermont: 'VT',
  'Virgin Islands': 'VI',
  Virginia: 'VA',
  Washington: 'WA',
  'West Virginia': 'WV',
  Wisconsin: 'WI',
  Wyoming: 'WY' };