import DS from 'ember-data';

export default DS.Model.extend({
  sample: DS.attr('string'),
  potential: DS.belongsTo('potential', {async: true}),
  energy: DS.attr(),
  design: DS.attr(),

  aerosolMonthsSaving: function () {
    var potential = this.get('potential');
    var utilityUsage = potential.get('utilityUsage');
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


  }.property('potential')
});
