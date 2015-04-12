import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.attr(),
  probability: DS.attr()
});
