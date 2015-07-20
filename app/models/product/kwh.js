import DS from 'ember-data';

export default DS.Model.extend({
  kwhUsage: DS.attr(),
  item: DS.belongsTo('proposal/item'),

  monthlyKwhSavings: function() {
    var calendar = this.get('item.proposal.calendar'),
      months = Ember.Object.create(),
      usage = parseFloat(this.get('kwhUsage'));

    calendar.forEach(function(item) {
      months.set(item, usage);
    });

    return months;
  }.property('kwhUsage'),

  avgMonthlyKwhSavings: function() {
    return parseFloat(this.get('kwhUsage')).toFixed(2);
  }.property('kwhUsage'),

  annualKwhSavings: function() {
    return (parseFloat(this.get('kwhUsage')) * 12).toFixed(2);
  }.property('kwhUsage')
});
