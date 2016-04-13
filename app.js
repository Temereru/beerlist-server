var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/beers');

var Beer = require("./BeerModel");

var app = express();

app.use(bodyParser.json());   // This is the type of body we're interested in
app.use(bodyParser.urlencoded({extended: false}));

app.listen(8000);

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
  var id = req.params.id;
  Beer.findById(id, function (err, found) {
    found.set(req.body);
    found.save();
  });
});

app.delete('/beers/:id',  function(req, res, next) {
  var id = req.params.id;
  Beer.findByIdAndRemove(id, function(a){
    res.end(a);
  });
});

app.put('')
