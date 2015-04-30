import DS from 'ember-data';

export default DS.Model.extend({
  potentialName: DS.attr(),
  address: DS.attr(),
  utility: DS.attr(),
  rateSchedule: DS.attr(),
  averageBill: DS.attr(),
  anualUsage: DS.attr()
});
