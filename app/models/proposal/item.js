import DS from 'ember-data';
import {savingsCalculation} from '../product';


export default DS.Model.extend({
  marketItem: DS.belongsTo('market-profile/item'),
  proposal: DS.belongsTo('proposal'),

  calculation: DS.belongsTo('product/calculation', {
    inverse: 'item'
  }),
  kwh: DS.belongsTo('product/kwh', {
    inverse: 'item'
  }),
  percent: DS.belongsTo('product/percent', {
    inverse: 'item'
  }),

  selected: DS.attr(),

  /**
   * Return savings calculation strategy
   */
  savingsCalculation: function() {
    var strategy = this.get('marketItem.product.savingsCalculationName');

    switch(strategy) {
      case savingsCalculation.CALCULATION:
            return this.get('calculation');
      case savingsCalculation.KWH:
            return this.get('kwh');
      case savingsCalculation.PERCENTAGE_TOTAL:
            return this.get('percent');
      default:
            return null;
    }
  }.property(),


  rgbColor: [],

  rgbColorCss: function() {
    return 'rgb(' + this.rgbColor.join(', ') + ')';
  }.property('rgbColor')
});
