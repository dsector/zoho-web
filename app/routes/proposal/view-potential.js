import Ember from 'ember';

export default Ember.Route.extend({
  renderTemplate: function(){
    this.render('proposal.singleview', {outlet: 'proposal'})
  },

  setupController: function(controller, proposal){

    controller.set('model', proposal);



    console.log("mttt");
    console.log(proposal.potential);


    //console.log(proposal.potential);
  }
});
