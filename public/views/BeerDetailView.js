var BeerDetailView = Backbone.View.extend({
  tagName: 'reviews-container-inner',

  template: Handlebars.compile($('#beer-detail-template').html()),

  events: {
    'click .submit-review': 'addReview'
  },

  initialize: function(){
    this.reviews = new ReviewCollection();
    this.reviews.url = '/beers/' + this.model.id + '/reviews';
    this.listenTo(this.reviews, 'add', this.renderReview);
    this.reviews.fetch();
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  addReview: function () {
    var name = this.$el.find('#review-name-input').val();
    var text = this.$el.find('#review-text-input').val();

    if(name !== '' && text !== ''){
      var review = {
        name: name,
        text: text
      };

      this.reviews.create(review, {wait: true});
    }
  },

  renderReview: function (model) {
    var reviewView = new ReviewView({ model: model });
    $('.reviews-list').append(reviewView.render().el)
  }
});