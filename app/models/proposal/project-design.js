import DS from 'ember-data';

export default DS.Model.extend({
  systemSize: DS.attr(),
  systemProduction: DS.attr(),
  pricePerWatt: DS.attr()
});
