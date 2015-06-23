import DS from 'ember-data';

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
  }.property('billCalendar.constructor.attributes.@each'),

  /**
   * Get the highest electricity bill
   */
  highElectricityBill: function() {
    return this._calcMax(this.get('billCalendar.constructor.attributes'), this.get('billCalendar'));
  }.property('billCalendar'),

  /**
   * Get the average electricity bill
   */
  avgElectricityBill: function() {
    return this._calcAvg(this.get('billCalendar.constructor.attributes'));
  }.property('billCalendar.constructor.attributes.@each'),

  /**
   * Calculate the avg of the map
   *
   * @param map
   * @returns {number}
   * @private
   */
  _calcAvg: function(map) {
    var sum = 0,
      length = map.length;

    map.forEach(function(name, item) {
      sum += item;
    });

    return sum / length;
  },

  /**
   * Calc the max value
   *
   * @param map
   * @returns {number}
   * @private
   */
  _calcMax: function(map, model) {
    var max = 0;

    map.forEach(function(name, item) {
      if (model.get(item) > max) {
        max = model.get(item);
      }
    }.bind(this));

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
    var min = model.get('jan');

    map.forEach(function(name, item) {
      if (model.get(item) < min) {
        min = model.get(item);
      }
    });

    return min;
  }
});
