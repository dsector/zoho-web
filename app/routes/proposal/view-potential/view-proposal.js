import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function(){
    this.render({outlet: 'view-proposal', into: 'proposal.singleview'});
  }
});
