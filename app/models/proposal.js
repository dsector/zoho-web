import DS from 'ember-data';

var priceKwh = 0.13;
var kwhTax = 10;

export default DS.Model.extend({
  sample: DS.attr('string'),
  potential: DS.belongsTo('potential'),
  energy: DS.attr(),
  design: DS.attr(),
  items: DS.hasMany('proposal/item', {
    inverse: 'parentProposal'
  }),
  pvwatts: DS.belongsTo('proposal/pvwatt'),
  ratePerPeriod: DS.attr(),
  numberOfPeriods: DS.attr(),

  calendar: function() {
    return [
      'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'sep', 'oct', 'nov', 'dec'
    ];
  }.property(),

  colorItems: function () {
    var colors = [
        [64, 127, 170],
        [64, 127, 200],
        [64, 127, 235],
        [64, 127, 250]
      ],
      items = this.get('items'),
      i = 0;
    items.forEach(function (item, index) {
      item.set('rgbColor', colors[index]);
    });
  }.observes('items'),

  /**
   * Return selected items for this proposal
   */
  selectedItems: function() {
    return this.get('items').filterBy('selected', true);
  }.property('items.@each.selected'),

  solarPrice: function() {
    var ppw = this.get('design.pricePerWatt'),
      dcSize = this.get('pvwatts.systemCapacityKw');

    if (ppw && dcSize) {
      return ppw * dcSize;
    }

    return 0;
  }.property('design.pricePerWatt', 'pvwatts.systemCapacityKw'),

  poolPumpPrice: function() {
    var poolPump = this.get('items')
      .filterBy('selected', true)
      .findBy('marketItem.product.savingsCalculation', 'CALCULATION');

    if (poolPump && poolPump.get('marketItem.product.productPricing') == 'EACH') {
      return parseFloat(poolPump.get('marketItem.product.price'));
    }

    return 0;
  }.property('items.@each.selected'),

  /**
   * Calculate the total price of system
   */
  // TODO add aeroseal cost
  totalPrice: function() {
    return this.get('solarPrice') + this.get('poolPumpPrice');
  }.property('solarPrice', 'poolPumpPrice'),

  monthlyRate: function() {
    var r = this.get('ratePerPeriod'),
      n = this.get('numberOfPeriods'),
      pv = this.get('totalPrice');

    if (!pv  || !n || !r) {
      return 0;
    }

    r = r / 100;

    return (
      (r/12 * pv) /
      (1 - Math.pow(1 + r/12, 0 - n))
    );

  }.property('totalPrice', 'ratePerPeriod', 'numberOfPeriods'),

  poolPumpSaving: function(){
    var item = this.get('items').findBy('marketItem.product.savingsCalculation', 'CALCULATION'),
      c = 0;

    if (
      item != null &&
      item.hoursUsed != null &&
      item.existingDraw != null &&
      item.newDraw != null
    ) {
      c = (item.existingDraw - item.newDraw) * (item.hoursDaily * 30);
      return c.toFixed(2);
    } else {
      return 0;
    }
  }.property('items.@each.selected'),

  aerosolMonthsSaving: function () {
    var potential = this.get('potential');
    var utilityUsage = potential.get('utilityUsage');
    if(utilityUsage==null){
      return;
    }
    var usageCalendar = utilityUsage.usageCalendar;
    var resultCalendar = {};

    var minimUsageFromMonth = null;
    //find minimum usage from month
    for (var month in usageCalendar) {
      if(!isNaN(usageCalendar[month]) && usageCalendar[month] != null){
         if(minimUsageFromMonth == null){
           minimUsageFromMonth = {month: month, value:usageCalendar[month]};
         } else {
           if(Number(minimUsageFromMonth.value) > Number(usageCalendar[month])){
              minimUsageFromMonth.value = usageCalendar[month];
              minimUsageFromMonth.month = month;
           }
         }
      }
    }

    for (month in usageCalendar) {
      if(usageCalendar[month] != null){
        resultCalendar[month] = (Number(usageCalendar[month]) - Number(minimUsageFromMonth.value)) * 0.25;
      } else {
        resultCalendar[month] = null;
      }
    }

    return resultCalendar;
  }.property('potential'),

  aerosolSavingTotal: function(){
    var months = this.get('aerosolMonthsSaving');



    var total = 0;
    for(var m in months){
      if(months[m] != null && !isNaN(months[m])){
        total+=months[m];
      }
    }

    return total;

  }.property('potential'),

  usageAfterEnergyAndSolar: function(){

    var potential = this.get('potential');
    var poolPumpSaving = this.get('poolPumpSaving');
    var aerosolSavings = this.get('aerosolMonthsSaving');
    var utilityUsage = potential.get('utilityUsage');
    if(utilityUsage==null){
      return;
    }
    utilityUsage = utilityUsage.usageCalendar;
    var solarProduction = this.get('solarProduction');
    var aerosolValue = 0;
    var resultMonths = {};

    if(typeof aerosolSavings.jan == 'undefined'){
      return 0;
    }

    for(var m in utilityUsage){
      if(m in aerosolSavings && !isNaN(aerosolSavings.m)){
        aerosolValue=Number(aerosolSavings.m);
      }
      //resultMonths
      if(utilityUsage[m] != null){

        resultMonths[m] = Number(utilityUsage[m]) - poolPumpSaving - aerosolValue - solarProduction[m];
      } else {
        resultMonths[m] = 0;
      }
    }

    return resultMonths;

  }.property('aerosolMonthsSaving', 'poolPumpSaving', 'utilityUsage'),

  usageAfterEnergyAndSolarTotal: function(){
    var months = this.get('usageAfterEnergyAndSolar');

    var total = 0;
    for(var m in months){
      if(months[m] != null && !isNaN(months[m])){
        total+=months[m];
      }
    }

    return total;

  }.property('usageAfterEnergyAndSolar'),

  solarProduction: function(){
    return {
      jan: 1178,
      feb: 1168,
      mar: 1555,
      apr: 1652,
      jun: 1684,
      jul: 1618,
      aug: 1485,
      sep: 1528,
      oct: 1470,
      nov: 1404,
      dec: 1092
    }
  }.property(),

  billAfterSolar: function() {
    var initialBill = this.get('potential.utilityUsage.avgElectricityBill') || 0,
      acAnnual = this.get('pvwatts.ac_annual') || 0,
      ppw = this.get('design.pricePerWatt') || 0;

    if (initialBill == 0 || acAnnual == 0 || ppw == 0) {
      return 0;
    }

    return initialBill - (acAnnual / 12) * priceKwh + kwhTax;

  }.property('potential.utilityUsage.avgElectricityBill',
    'design.pricePerWatt',
    'pvwatts.ac_annual'
  )

});
