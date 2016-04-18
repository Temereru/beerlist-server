var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
  name: {type: String},
  text: {type: String}
})

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;