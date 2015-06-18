import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'get-started',

  setupController: function(controller, potential) {
    controller.set('model', potential);

    controller.set('proposal', this.store.createRecord('proposal', {
      //utilityUsage: this.createRecord('')
      potential: potential
    }));

    var utility = potential.get('utilityUsage');

    if (typeof utility == 'undefined' || utility == null) {
      potential.set('utilityUsage', this.store.createRecord('potential/utility'));

      utility = potential.get('utilityUsage');

      utility.set('usageCalendar', this.store.createRecord('potential/calendar'));
      utility.set('billCalendar', this.store.createRecord('potential/calendar'));
    }

  },

  actions: {
    willTransition: function(transition){
      var transitionName = transition.targetName;
      var currentRoute = this.controllerFor('application').get('currentRouteName');

      var transitionSpaces = transitionName.split('.');
      var currentSpaces = currentRoute.split('.');

      if(transitionSpaces[0] != currentSpaces[0]){
        this.store.unloadAll('proposal');
        this.store.unloadAll('potential');
        this.store.unloadAll('proposal/project-design');
        this.store.unloadAll('energy-efficiency');
      }
      /*
       this.store.unloadAll('proposal');
       this.store.unloadAll('potential');
       this.store.unloadAll('potential/utility');
       this.store.unloadAll('potential/calendar');
       */
    }
  }
});
