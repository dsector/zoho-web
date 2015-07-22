import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.findAll('setting');
  },

  setupController: function (controller, model) {

    //dc ac
    controller.set('settings.dc_ac_ratio', model.findBy('name', 'dc_ac_ratio') || this.store.createRecord('setting', {
        'name': 'dc_ac_ratio'
      }));

    // inv eff
    controller.set('settings.inv_eff', model.findBy('name', 'inv_eff') || this.store.createRecord('setting', {
        'name': 'inv_eff'
      }));

    // gcr
    controller.set('settings.gcr', model.findBy('name', 'gcr') || this.store.createRecord('setting', {
        'name': 'gcr'
      }));

    // system size
    controller.set('settings.system_size', model.findBy('name', 'system_size') || this.store.createRecord('setting', {
        'name': 'system_size'
      }));

    // system production
    controller.set('settings.system_production', model.findBy('name', 'system_production') || this.store.createRecord('setting', {
        'name': 'system_production'
      }));

    // ppw
    controller.set('settings.ppw', model.findBy('name', 'ppw') || this.store.createRecord('setting', {
        'name': 'ppw'
      }));
  }
});
