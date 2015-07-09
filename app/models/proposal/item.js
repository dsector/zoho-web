import DS from 'ember-data';

export default DS.Model.extend({
  marketItem: DS.belongsTo('market-profile/item'),

  calculation: DS.belongsTo('product/calculation'),
  kwh: DS.belongsTo('product/kwh'),
  percent: DS.belongsTo('product/percent'),

  selected: DS.attr()
});
