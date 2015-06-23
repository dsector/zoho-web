import DS from 'ember-data';

var billMonths = [
  'billCalendar.jan', 'billCalendar.feb', 'billCalendar.mar',
  'billCalendar.apr', 'billCalendar.jun', 'billCalendar.jul',
  'billCalendar.aug', 'billCalendar.sep', 'billCalendar.oct',
  'billCalendar.nov', 'billCalendar.dec', 'billCalendar.may'
];

var utilityMonths = [
  'usageCalendar.jan', 'usageCalendar.feb', 'usageCalendar.mar',
  'usageCalendar.apr', 'usageCalendar.jun', 'usageCalendar.jul',
  'usageCalendar.aug', 'usageCalendar.sep', 'usageCalendar.oct',
  'usageCalendar.nov', 'usageCalendar.dec', 'usageCalendar.may'
];

export default DS.Model.extend({

  electricityUsage: DS.attr(),
  rateSchedule: DS.attr(),
  anualKwh: DS.attr(),
  usageCalendar: DS.belongsTo('potential/calendar'),
  billCalendar: DS.belongsTo('potential/calendar'),



  /**
   * Get the lowest electricity bill
   */
  lowElectricityBill: function() {
    var attrs = this.get('billCalendar.constructor.attributes');

    return this._calcMin(attrs, this.get('billCalendar'));
  }.property('billCalendar.jan', 'billCalendar.feb', 'billCalendar.mar',
    'billCalendar.apr', 'billCalendar.jun', 'billCalendar.jul',
    'billCalendar.aug', 'billCalendar.sep', 'billCalendar.oct',
    'billCalendar.nov', 'billCalendar.dec', 'billCalendar.may'),

  /**
   * Get the highest electricity bill
   */
  highElectricityBill: function() {
    return this._calcMax(this.get('billCalendar.constructor.attributes'), this.get('billCalendar'));
  }.property('billCalendar.jan', 'billCalendar.feb', 'billCalendar.mar',
    'billCalendar.apr', 'billCalendar.jun', 'billCalendar.jul',
    'billCalendar.aug', 'billCalendar.sep', 'billCalendar.oct',
    'billCalendar.nov', 'billCalendar.dec', 'billCalendar.may'),

  /**
   * Get the average electricity bill
   */
  avgElectricityBill: function() {
    return this._calcAvg(this.get('billCalendar.constructor.attributes'), this.get('billCalendar'));
  }.property('billCalendar.jan', 'billCalendar.feb', 'billCalendar.mar',
    'billCalendar.apr', 'billCalendar.jun', 'billCalendar.jul',
    'billCalendar.aug', 'billCalendar.sep', 'billCalendar.oct',
    'billCalendar.nov', 'billCalendar.dec', 'billCalendar.may'),

  /**
   * Calculate the avg of the map
   *
   * @param map
   * @returns {number}
   * @private
   */
  _calcAvg: function(map, model) {
    var sum = 0, i;

    map.forEach(function(name, item) {
      i = model.get(item);

      if (!isNaN(i)) {
        sum += i;
      }
    });

    return (sum / map.size).toFixed(2);
  },

  /**
   * Calc the max value
   *
   * @param map
   * @returns {number}
   * @private
   */
  _calcMax: function(map, model) {
    var max = 0, i;

    map.forEach(function(name, item) {
      i = parseFloat(model.get(item));
      if (i > max) {
        max = i;
      }
    });

    return max;
  },

  /**
   * Calculate the minimum value
   *
   * @param map
   * @returns {*}
   * @private
   */
  _calcMin: function(map, model) {
    var min = model.get('jan'), i;

    map.forEach(function(name, item) {
      i = parseFloat(model.get(item));
      if (i < min) {
        min = i;
      }
    });

    return min;
  }
});
