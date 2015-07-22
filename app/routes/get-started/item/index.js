import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function(controller, potential) {
    this.loadGoogleMap();
    controller.set('model', potential);
    controller.set('marketProfiles', this.store.findAll('market-profile/profile'));

    controller.set('proposal', this.store.createRecord('proposal', {
      //utilityUsage: this.createRecord('')
      potential: potential,
      pvwatts: this.store.createRecord('proposal/pvwatt'),
      design: this.store.createRecord('proposal/project-design')
    }));

    this.store.findAll('setting').then(function(settings) {
      var pv = controller.get('proposal.pvwatts'),
        dc_ac_ratio = settings.findBy('name', 'dc_ac_ratio'),
        inv_eff = settings.findBy('name', 'inv_eff'),
        gcr = settings.findBy('name', 'gcr'),
        ppw = settings.findBy('name', 'ppw');

      pv.setProperties({
        'dc_ac_ratio': dc_ac_ratio ? dc_ac_ratio.get('value') : null,
        'inv_eff': inv_eff ? inv_eff.get('value') : null,
        'gcr': gcr ? gcr.get('value') : null
      });

      controller.get('proposal.design').set('pricePerWatt', ppw ? ppw.get('value') : null);
    });

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
