import DS from 'ember-data';

export default DS.Model.extend({
  externalId: DS.attr(),
  potentialName: DS.attr(),
  address: DS.attr('string', {defaultValue: 'none'}),
  utility: DS.attr(),
  rateSchedule: DS.attr(),
  averageBill: DS.attr(),
  anualUsage: DS.attr(),

  //ooo
  utilityUsage: DS.attr(),

  proposals: DS.hasMany('proposal'),

  proposalsLength: function(){
    return this.get('proposals.length');
  }.property('proposals.length'),

  twentyFiveTimesBill: function(){
    return Number(this.get('averageBill')) * 25;
  }.property('averageBill')

});
