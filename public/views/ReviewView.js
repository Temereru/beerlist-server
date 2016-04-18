var ReviewView = Backbone.View.extend({

  template: $('#review-template'),

  events: {
    'click .remove': 'removeReview'
  },

  render: function(){
    var template = Handlebars.compile(this.template.html());
    this.$el.html(template(this.model.toJSON()));
    return this;
  },

  removeReview: function(){
    this.model.destroy();
    this.remove();
  }
});