import Ember from 'ember';

export default Ember.Route.extend({

  renderTemplate: function(){
    this.render('crm.zoho.potentials.view', {
      into: 'crm.zoho.potentials'
    });
  }
});
