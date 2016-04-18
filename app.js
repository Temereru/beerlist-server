var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/beers');

var Beer = require("./Models/BeerModel");
var Review = require("./Models/reviewModel");

var app = express();

app.use(bodyParser.json());   // This is the type of body we're interested in
app.use(bodyParser.urlencoded({extended: false}));

app.listen(8080);

app.set('view engine', 'ejs');
app.set('views', __dirname);

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.get('/beers', function (req, res) {
  Beer.find(function (error, beers) {
    res.json(beers);
  });
});

app.post('/beers', function (req, res) {
  console.log(req.body);
  var beer = new Beer(req.body);
  console.log(beer);
  beer.save(function(err, beer) {
    if (err) { return next(err); }

    res.json(beer);
  });
});

app.put('/beers/:id',  function(req, res, next) {
  Beer.findById(req.params.id, function (err, found) {
    if (err) { return next(err); }
    found.set(req.body);
    found.save(function(err, beer) {
      if (err) { return next(err); }

      res.json(beer);
    });
  });
});

app.delete('/beers/:id',  function(req, res, next) {
  var id = req.params.id;
  Beer.findByIdAndRemove(id, function(a){
    res.end(a);
  });
});

app.post('/beers/:id/reviews', function(req, res, next) {
  Beer.findById(req.params.id, function(err, found){
    console.log(req.body);
    var review = new Review(req.body);
    found.reviews.push(review);
    found.save(function(err, beer) {
      if (err) { return next(err); }

      res.json(beer.reviews);
    });
  });
});

app.get('/beers/:id/reviews', function(req, res, next) {
  Beer.findById(req.params.id, function(err, found){
    res.json(found.reviews);
  });
});

app.delete('/beers/:id/reviews/:id2', function(req, res, next) {
  Beer.findById(req.params.id, function(err, found){
    var index = found.reviews.findIndex(function(review){return review['_id'] == req.params.id2});
    found.reviews.splice(index,1);
    found.save(function(err, beer) {
      if (err) { return next(err); }

      res.json(beer.reviews);
    });
  });
});
