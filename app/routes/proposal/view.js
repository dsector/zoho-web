import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function(){
    this.render('proposal.view', {outlet: 'proposal'})
  }
});
