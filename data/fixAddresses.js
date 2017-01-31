const fs = require('fs');
const path = require('path');

const filetoProcess = path.join(__dirname, process.argv[2]);
const content = fs.readFileSync(filetoProcess);
const jsonContent = JSON.parse(content);

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

for (var i = 0; i < jsonContent.length; i++) {
  let currentItem = jsonContent[i];

  //we only need to parse the city, state zip
  let districtParsed = parseAddress(currentItem['District Address Line 3']);

  
  currentItem['district_address_1'] = currentItem['District Address Line 1']; 
  currentItem['district_address_2'] = currentItem['District Address Line 2'];
  //if state string is > than 2 letters swap it for the appropriate state code
  if (districtParsed.state.length > 2) {
    currentItem['district_address_state'] = states[districtParsed.state];
  } else {
    currentItem['district_address_state'] = districtParsed.state;
  }
  //this is how we need addresses formatted for Lob
  currentItem['district_address_city'] = districtParsed.city;
  currentItem['district_address_zip'] = districtParsed.zip;

  console.log(currentItem);

}

//console.log();
