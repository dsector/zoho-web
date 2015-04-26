import Ember from 'ember';

export default Ember.Component.extend({

  /*
   energyEfficiencyValue: function (val) {
   var value = this.get('energy-efficiency-value');
   //this.send('valueUpdated');
   this.sendAction('update');
   }.observes('energy-efficiency-value'),
   */

  poolpump: undefined,
  aerosol: undefined,
  solar: undefined,

  poolPumpCheckbox: function () {
    var checkbox = this.get('poolpump');

    if (checkbox) {
      Ember.$('#pool-pump-fields').show();
    } else {
      Ember.$('#pool-pump-fields').hide();
    }

  }.observes('poolpump'),

  aerosolCheckbox: function () {
    var checkbox = this.get('aerosol');

    if (checkbox) {
      Ember.$('#aerosol-fields').show();
    } else {
      Ember.$('#aerosol-fields').hide();
    }
  }.observes('aerosol'),

  solarCheckbox: function () {
    var checkbox = this.get('solar');

    if (checkbox) {
      Ember.$('#solar-fields').show();
    } else {
      Ember.$('#solar-fields').hide();
    }
  }.observes('solar'),

  actions: {
    updateData: function(){
      this.sendAction('update');
    }
  }

});
