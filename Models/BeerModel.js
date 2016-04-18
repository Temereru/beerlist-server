var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beerSchema = new Schema({
  name: {type: String},
  style: {type: String},
  abv: {type: Number},
  image_url: {type: String},
  ratings: {type: Array},
  avgRate: {type: Number},
  reviews: []
})

var Beer = mongoose.model('Beer', beerSchema);
module.exports = Beer;