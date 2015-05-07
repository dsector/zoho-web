import DS from 'ember-data';

export default DS.Model.extend({

  electricityUsage: DS.attr(),
  rateSchedule: DS.attr(),
  anualKwh: DS.attr(),
  lowElectricityBill: DS.attr(),
  averageElectricityBill: DS.attr(),
  highElectricityBill: DS.attr(),

  usageCalendar: DS.attr(),
  billCalendar: DS.attr()
});
