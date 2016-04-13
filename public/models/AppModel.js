var AppModel = Backbone.Model.extend({
  defaults:{
    beerCollection: new BeerCollection()
  }
});