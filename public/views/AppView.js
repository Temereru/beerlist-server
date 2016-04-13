var AppView = Backbone.View.extend({
  el: 'body',

  events: {
    'click #beer-submit': 'addBeer',
    'click .sort': 'sort'
  },

  initialize: function(){
    this.listenTo(this.model.get('beerCollection'), 'add', this.renderBeer);
    this.listenTo(this.model.get('beerCollection'), 'sort', this.reRender);
    this.listenTo(this.model.get('beerCollection'), 'reset', this.reRender);
    this.$beerContainer = this.$('#beer-container');
    this.model.get('beerCollection').comparator = "avgRate";
  },

  renderBeer: function(beer){
    var view = new BeerView({model: beer});

    this.$beerContainer.append(view.render().el);
  },

  addBeer: function(e){
    var $form = this.$el.find('#beer-form');
    var name = $form.find('#beer-name').val();
    var style = $form.find('#beer-style').val();
    var ABV = $form.find('#beer-abv').val();
    var img = $form.find('#beer-img').val();
    if(name !== '' && style !== '' && ABV !== '' && img !== ''){
      var beer = {
        name: name,
        style: style,
        abv: ABV,
        image_url: img
      };

      this.model.get('beerCollection').create(beer);
    }
  },

  sort: function(){
    this.model.get('beerCollection').sort();
  },

  reRender: function(){
    this.$beerContainer.empty();
    this.model.get('beerCollection').each(function(element, index, list){
      this.renderBeer(element);
    }, this);
  }

});