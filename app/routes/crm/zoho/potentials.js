import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function (controller, potentials) {
    console.log("controller-setuped");
    controller.set('potentials', potentials);
  },

  model: function () {
    return this.store.findAll('potential');
  }
});
