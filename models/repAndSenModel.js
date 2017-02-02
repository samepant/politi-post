const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repAndSenSchema = new Schema({
  last_name: {type: String, required: true},
  first_name: {type: String, required: true},
  bio_guide: String,
  party: String,
  district_address_1: String,
  district_address_2: String,
  district_address_city: String,
  district_address_state: String,
  district_address_zip: String,
  dc_address: String,
  dc_city: String,
  dc_state: {type: String, default: 'DC'},
  dc_zip: String,
  //true if senator, false if representative 
  senator: Boolean,
  postcardsReceived: [
    {
      postcardId: {type: String, required: true},
      senderEmail: String
    }
  ]
});

const RepAndSen = mongoose.model('repAndSen', repAndSenSchema);

module.exports = RepAndSen;