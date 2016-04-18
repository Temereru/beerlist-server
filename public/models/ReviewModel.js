var ReviewModel = Backbone.Model.extend({
  defaults: {
    name: '',
    text: ''
  },

  parse: function(response){
    response.id =  response._id;

    return response;
  }
})