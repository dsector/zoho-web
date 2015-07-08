import DS from 'ember-data';

export default DS.Model.extend({
  existingDraw: DS.attr(),
  newDraw: DS.attr(),
  hoursDaily: DS.attr()
});
