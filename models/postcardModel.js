const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postcardTemplateSchema = new Schema({
  message: {type: String, required: true},
  backgroundURL: {type: String, required: true}
}); 

const postcardTemplate = mongoose.model('PostcardTemplate', postcardTemplateSchema);
module.exports = postcardTemplate;