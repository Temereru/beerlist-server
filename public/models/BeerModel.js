var BeerModel = Backbone.Model.extend({
  defaults: {
    name: '',
    style: '',
    abv: 0,
    image_url: '',
    ratings: [],
    avgRate: 0,
    reviews: []
  },

  parse: function(response){
    response.id =  response._id;

    return response;
  }
});