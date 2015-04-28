import DS from 'ember-data';

export default DS.Model.extend({
  existingPoolPump: DS.attr(),
  newPoolPump: DS.attr(),
  hoursUsed: DS.attr(),

  aerosolPercentage: DS.attr(),

  solarKilowatt: DS.attr()
})
