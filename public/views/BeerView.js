var BeerView = Backbone.View.extend({

  template: $('#beer-template'),

  events: {
    'click .remove-beer': 'delete',
    'dblclick .name': 'toggleEditName',
    'click .name-edit-submit' : 'editName',
    'click .rate-submit': 'addRating'
  },

  initialize: function(){
    this.listenTo(this.model, 'change', this.update);
    this.listenTo(this.model, 'change:name', this.reName);
    this.listenTo(this.model, 'change:ratings', this.reAvg);
    this.listenTo(this.model, 'change:avgRate', this.renderAvg);

  },

  render: function(){
    var template = Handlebars.compile(this.template.html());
    this.$el.html(template(this.model.toJSON()));

    return this;
  },

  delete: function(){
    this.model.destroy();
    this.remove();
  },

  toggleEditName: function(){
    this.$el.find('.name-li').toggleClass('editing');
    this.$el.find('.name-edit').find('input').focus();
    this.$el.find('.name-edit').find('input').val('');
  },

  editName: function(e){
    var newName = this.$el.find('input').val();
    this.model.set('name', newName);
  },

  reName: function(){
    this.$el.find('.name').html(this.model.get('name'));
    this.toggleEditName();
  },

  addRating: function(e) {
    var rate = this.$el.find('.rating-select').val();
    var temp = this.model.get('ratings').slice();
    temp.push(Number(rate));
    this.model.set('ratings', temp);
  },

  reAvg: function(){
    var tempArr = this.model.get('ratings');
    var temp = 0;
    for(var i = 0; i < tempArr.length; i++){
      temp += tempArr[i];
    }
    var avg = temp / tempArr.length;
    this.model.set('avgRate', avg);
  },

  renderAvg: function(){
    this.$el.find('.avg-rating').html(this.model.get('avgRate'));
  },

  update: function(model){
    this.model.save();
  }
});