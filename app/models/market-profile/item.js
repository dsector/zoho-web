import DS from 'ember-data';

export default DS.Model.extend({

  product: DS.belongsTo('product'),

  calculation: DS.attr(),
  percent: DS.attr(),
  kwh: DS.attr(),

  federal: DS.attr(),
  state: DS.attr(),
  utility: DS.attr(),
  tax: DS.attr(),
  rebates: DS.attr(),

  selected: false,

  logCacat: function() {
    console.log('ma cacat');
  }.observes('poolPump.existingDraw')
});
