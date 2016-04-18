var AppView = Backbone.View.extend({
  el: 'body',

  events: {
    'click #beer-submit': 'addBeer',
    'click .sort': 'sort'
  },

  initialize: function(){
    this.listenTo(this.model.get('beerCollection'), 'add', this.renderBeer);
    this.listenTo(this.model.get('beerCollection'), 'reset', this.reRender);
    this.listenTo(this.model.get('beerCollection'), 'sort', this.reRender);
    this.listenTo(this.model, 'change:show_reviews', this.renderView)
    this.$beerContainer = this.$('#beer-container');
    this.model.get('beerCollection').comparator = "avgRate";
    this.$reviewsContainer = this.$('.reviews-container');
    this.listenTo(this.model, 'change:current_beer', this.renderDetailView);
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

      this.model.get('beerCollection').create(beer, {wait: true});
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
  },

  renderView: function (model) {
    if(model.get('show_reviews')){
      $('.beers-container').removeClass('show');
      $('.reviews-container').addClass('show');
    }else{
      $('.beers-container').addClass('show');
      $('.reviews-container').removeClass('show');
    }
  },

  renderDetailView: function () {
    if (this.detailView) {
      this.detailView.remove();
    }

    this.detailView = new BeerDetailView({ model: this.model.get('current_beer')});

    this.$reviewsContainer.append(this.detailView.render().el);
  }

});