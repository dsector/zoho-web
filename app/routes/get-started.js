import Ember from 'ember';

export default Ember.Route.extend({

  controllerName: 'get-started',
  setupController: function (controller, potentials) {
    controller.set('potentials', potentials);

    controller.set('proposal', this.store.createRecord('proposal', {
      sample: 'dadadadvvv'
    }));

    controller.set('energy', this.store.createRecord('energy-efficiency'));
  },

  model: function () {
    return this.store.findAll('potential');
  }


});
