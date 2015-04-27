import DS from 'ember-data';

export default DS.Model.extend({
  sample: DS.attr('string')
  //potential: DS.belongsTo('potential'),
  //energyEfficiency: DS.belongsTo('energy-efficiency')
});
