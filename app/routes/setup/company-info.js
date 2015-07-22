import Ember from 'ember';

export default Ember.Route.extend({

  model: function () {
    return this.store.findAll('setting');
  },

  setupController: function (controller, model) {

    controller.set('settings.companyName', model.findBy('name', 'companyName') || this.store.createRecord('setting', {
        'name': 'companyName'
      }));
    controller.set('settings.companyAddress', model.findBy('name', 'companyAddress') || this.store.createRecord('setting', {
        'name': 'companyAddress'
      }));
    controller.set('settings.companyPhone', model.findBy('name', 'companyPhone') || this.store.createRecord('setting', {
        'name': 'companyPhone'
      }));
    controller.set('settings.companyEmail', model.findBy('name', 'companyEmail') || this.store.createRecord('setting', {
        'name': 'companyEmail'
      }));
    controller.set('settings.companyLicense', model.findBy('name', 'companyLicense') || this.store.createRecord('setting', {
        'name': 'companyLicense'
      }));
    controller.set('settings.companyGrossProfitMargin', model.findBy('name', 'companyGrossProfitMargin') || this.store.createRecord('setting', {
        'name': 'companyGrossProfitMargin'
      }));


  }

});
