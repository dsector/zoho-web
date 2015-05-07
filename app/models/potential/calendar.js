import DS from 'ember-data';

export default DS.Model.extend({
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
  dec: DS.attr()
});
