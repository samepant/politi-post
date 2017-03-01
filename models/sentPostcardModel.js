const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sentPostcardSchema = new Schema({
  lobID: {type: String, required: true},
  senderEmail: {type: String, required: true},
  dateCreated: {type: String, required: true},
  sentTo: {
    name: String,
    address_line1: String,
    address_line2: String,
    address_city: String,
    address_state: String,
    address_zip: String
  },
  expectedDeliveryDate: String,
  postcardURL: String
}); 

const sentPostcard = mongoose.model('sentPostcard', sentPostcardSchema);
module.exports = sentPostcard;