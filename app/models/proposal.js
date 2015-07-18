import DS from 'ember-data';

export default DS.Model.extend({
  sample: DS.attr('string'),
  potential: DS.belongsTo('potential', {async: true}),
  energy: DS.attr(),
  design: DS.attr(),
  items: DS.hasMany('proposal/item'),
  pvwatts: DS.belongsTo('proposal/pvwatt'),
  ratePerPeriod: DS.attr(),
  numberOfPeriods: DS.attr(),

  solarPrice: function() {
    var ppw = this.get('design.pricePerWatt'),
      dcSize = this.get('pvwatts.system_capacity');

    if (ppw && dcSize) {
      return ppw * dcSize;
    }

    return 0;
  }.property('design.pricePerWatt', 'pvwatts.system_capacity'),

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

    console.log('Calculating:', r, n, pv);

    if (!pv  || !n || !r) {
      return 0;
    }

    r = r / 100;

    return (
      (r/12 * pv) /
      (1 - Math.pow(1 + r/12, 0 - n))
    ).toFixed(2);

  }.property('totalPrice', 'ratePerPeriod', 'numberOfPeriods'),

  poolPumpSaving: function(){
    var energy = this.get('energy');

    if (
      energy != null &&
      energy.hoursUsed != null &&
      energy.existingPoolPump != null &&
      energy.newPoolPump != null
    ) {
      var c = (energy.existingPoolPump-energy.newPoolPump);
      c = c*energy.hoursUsed;
      c = c*30;
      c = c/1000;

      return c;
    } else {
      return 0;
    }
  }.property('energy'),

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
      //console.log(usageCalendar[month]);
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
  }.property()
});
