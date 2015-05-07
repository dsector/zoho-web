import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'get-started',
  renderTemplate: function(){
    this.render({outlet: 'proposal-item'});
  },


  setupController: function(controller, potential) {
    controller.set('model', potential);

    var utility = potential.get('utilityUsage');

    console.log("UUUUUUUUUUU");
    console.log(utility);

    if (typeof utility == 'undefined' || utility == null) {
      potential.set('utilityUsage', this.store.createRecord('potential/utility'));

      var utility = potential.get('utilityUsage');

      utility.set('usageCalendar', this.store.createRecord('potential/calendar'));
      utility.set('billCalendar', this.store.createRecord('potential/calendar'));

    }




  }


});
