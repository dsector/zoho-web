import Ember from 'ember';

export default Ember.Route.extend({
  redirectDefault: function() {
    this.transitionTo('setup.products-pricing');
  }.on('activate')
});
