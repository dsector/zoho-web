import DS from 'ember-data';

export default DS.Model.extend({

  potential: DS.belongsTo('potential'),
  energyEfficiency: DS.belongsTo('energy-efficiency')
});
