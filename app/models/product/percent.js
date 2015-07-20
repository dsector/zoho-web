import DS from 'ember-data';

export default DS.Model.extend({
  percentUsage: DS.attr(),
  item: DS.belongsTo('proposal/item'),


  avgMonthlyKwhSavings: function() {
    return (this.get('annualKwhSavings') / 12);
  }.property('annualKwhSavings'),

  annualKwhSavings: function() {
     var sum = 0,
       calendar = this.get('item.proposal.calendar'),
       savings = this.get('monthlyKwhSavings');

    calendar.forEach(function(month) {
      if (!isNaN(savings[month])) {
        sum += savings[month];
      }
    });

    return sum;
  }.property('monthlyKwhSavings'),

  monthlyKwhSavings: function() {
    var potential = this.get('item.proposal.potential');
    console.log('Potential:', potential.get('potentialName'));
    var utilityUsage = potential.get('utilityUsage');
    var calendar = this.get('item.proposal.calendar');
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

    console.log('Percent monthly:', minimumUsage, resultCalendar, usageCalendar);

    return resultCalendar;
  }.property('item.proposal.potential.utilityUsage.usageCalendar.changedMonths')
});
