const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postcardTemplateSchema = new Schema({
  message: {type: String, required: true},
  backgroundURL: {type: String, required: true},
  landscape: {type: Boolean, required: true, default: true}
}); 

const postcardTemplate = mongoose.model('PostcardTemplate', postcardTemplateSchema);
module.exports = postcardTemplate;