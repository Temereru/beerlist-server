var AppModel = Backbone.Model.extend({
  defaults: function () {
    return {
      beerCollection: new BeerCollection(),

      current_beer: null,

      // either true or false
      show_reviews: false
    }
  }
});