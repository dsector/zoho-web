import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.findAll('market-profile/profile');
  },

  setupController(controller, model) {
    var savedProducts = this.store.findAll('product');

    savedProducts.then(function() {
      controller.set('products', savedProducts);
      controller.set('newProfile', controller.createNewProfile());
      controller.set('newItem', controller.createNewItem());
    });

    controller.set('model', model);
  }
});
