import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'get-started',
  renderTemplate: function(){
    this.render({outlet: 'view-proposal', into: 'proposal.singleview'});
  },

  setupController: function(controller, proposal){
    controller.set('proposal', proposal);
    controller.set('model', proposal.get('potential'));
  }
});
