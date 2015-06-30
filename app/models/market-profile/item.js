import DS from 'ember-data';

export default DS.Model.extend({
  product: DS.belongsTo('product'),
  federal: DS.attr(),
  state: DS.attr(),
  utility: DS.attr(),
  tax: DS.attr(),
  rebates: DS.attr()
});
