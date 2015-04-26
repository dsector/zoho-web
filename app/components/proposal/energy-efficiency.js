import Ember from 'ember';

export default Ember.Component.extend({


  energyEfficiencyValue: function (val) {
    var value = this.get('energy-efficiency-value');


    //this.send('valueUpdated');
    this.sendAction('update');

  }.observes('energy-efficiency-value'),


  actions: {
    valueUpdated: function(){
      console.log('value updated triggered successfully!');
      this.sendAction('update');
    }
  }

});
