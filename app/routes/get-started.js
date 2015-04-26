import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'get-started',
  setupController: function (controller, potentials) {
    controller.set('potentials', potentials);
  },

  model: function () {
    return this.store.findAll('potential');
  }


});
