import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'get-started',
  renderTemplate: function(){
    this.render({outlet: 'proposal-item'});
  }

});
