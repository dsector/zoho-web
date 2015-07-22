import DS from 'ember-data';

export default DS.Model.extend({
  percentUsage: DS.attr(),
  parentItem: DS.belongsTo('proposal/item', {
    inverse: 'percent'
  }),


  avgMonthlyKwhSavings: function() {
    return (this.get('annualKwhSavings') / 12);
  }.property('annualKwhSavings'),

  annualKwhSavings: function() {
     var sum = 0,
       calendar = this.get('parentItem.proposal.calendar'),
       savings = this.get('monthlyKwhSavings');

    calendar.forEach(function(month) {
      if (!isNaN(savings[month])) {
        sum += savings[month];
      }
    });

    return sum;
  }.property('monthlyKwhSavings'),

  monthlyKwhSavings: function() {
    var potential = this.get('parentItem.proposal.potential');
    var utilityUsage = potential.get('utilityUsage');
    var calendar = this.get('parentItem.proposal.calendar');
    if(utilityUsage==null){
      return;
    }
    var usageCalendar = utilityUsage.get('usageCalendar');
    var resultCalendar = {};
    var percent = parseFloat(this.get('percentUsage')) / 100;
    var minimumUsage = utilityUsage.get('minimumUsage');
    var month, monthUsage;

    calendar.forEach(function(month) {
      monthUsage = usageCalendar.get(month);

      if(monthUsage){
        resultCalendar[month] = ((parseFloat(monthUsage) - minimumUsage) * percent);
      } else {
        resultCalendar[month] = null;
      }
    });

    return resultCalendar;
  }.property('parentItem.proposal.potential.utilityUsage.usageCalendar.changedMonths')
});
