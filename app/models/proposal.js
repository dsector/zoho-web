import DS from 'ember-data';

export default DS.Model.extend({
  sample: DS.attr('string'),
  potential: DS.belongsTo('potential', {async: true}),
  energy: DS.attr(),
  design: DS.attr()
});
