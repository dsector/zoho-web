import DS from 'ember-data';

export default DS.Model.extend({
  potentialName: DS.attr(),
  owner: DS.attr(),
  probability: DS.attr(),
  contract: DS.attr(),
  contractAmount: DS.attr(),
  closingDate: DS.attr()
});
