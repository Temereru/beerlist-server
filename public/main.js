var appModel = new AppModel();
var appView = new AppView({model: appModel});

appModel.get('beerCollection').fetch({reset: true});

// appView.model.get('beerCollection').add({
//   name: 'Midnight',
//   style: 'Porter',
//   abv: 5,
//   image_url: 'http://www.beerometer.co.il/product_images/x/85_350.jpg'
// });
// appView.model.get('beerCollection').add({
//   name: 'indira',
//   style: 'IPA',
//   abv: 7,
//   image_url: 'http://www.beerometer.co.il/product_images/x/86_349.jpg'
// });