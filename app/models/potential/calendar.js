import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend(Ember.Evented, {
  jan: DS.attr(),
  feb: DS.attr(),
  mar: DS.attr(),
  apr: DS.attr(),
  may: DS.attr(),
  jun: DS.attr(),
  jul: DS.attr(),
  aug: DS.attr(),
  sep: DS.attr(),
  oct: DS.attr(),
  nov: DS.attr(),
  dec: DS.attr(),


  changedMonths: "",
  /**
   * Trigger an event when any month changed
   */
  monthHasChanged: function(value) {
    this.set('changedMonths', JSON.stringify(value._attributes));
   }.observes('jan', 'feb', 'mar', 'apr', 'may',
    'jun', 'jul', 'sep', 'oct', 'nov', 'dec'
  )

});
