import DS from 'ember-data';

export default DS.Model.extend({
  existingDraw: DS.attr(),
  newDraw: DS.attr(),
  hoursDaily: DS.attr(),
  item: DS.belongsTo('proposal/item'),

  _getCalendar: function() {
    return this.get('item.proposal.calendar');
  },

  calculateMonthlySavings: function() {
    var newDraw = parseFloat(this.get('newDraw')),
      existingDraw = parseFloat(this.get('existingDraw')),
      hoursDaily = parseFloat(this.get('hoursDaily'));
    if (
      isNaN(newDraw)
      || isNaN(existingDraw)
      || isNaN(hoursDaily)
    ) {
      return 0;
    }

     return ((existingDraw - newDraw) * (hoursDaily * 30));
  },

  monthlyKwhSavings: function() {
    var calendar = this._getCalendar(),
      savings = {},
      calculation = this.calculateMonthlySavings();

    if (calculation == 0) {
      return savings;
    }

    calendar.forEach(function(month) {
      savings[month] = calculation;
    });

    return savings;
  }.property('newDraw', 'existingDraw', 'hoursDaily'),

  avgMonthlyKwhSavings: function() {
    return this.calculateMonthlySavings();
  }.property('newDraw', 'existingDraw', 'hoursDaily'),

  annualKwhSavings: function() {
    return this.calculateMonthlySavings() * 12;
  }.property('newDraw', 'existingDraw', 'hoursDaily')
});
