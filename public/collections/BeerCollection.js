var BeerCollection = Backbone.Collection.extend({
  model: BeerModel,
  url: '/beers'
});