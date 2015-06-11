import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    return this.store.createRecord('market-profile/profile');
  },

  setupController(controller, model) {
    var savedProfiles = this.store.findAll('market-profile/profile');

    controller.set('model', model);
    controller.set('savedProfiles', savedProfiles);
    controller.set('item', this.store.createRecord('market-profile/item'));
  }
});
