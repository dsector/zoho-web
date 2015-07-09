import DS from 'ember-data';
import config from '../../config/environment';

export var values = {
  module_type: [
    {value: 0, name: "Standard"},
    {value: 1, name: "Premium"},
    {value: 2, name: "Thin film"}
  ],
  array_type: [
    {value: 0, name: "Fixed - Open Rack"},
    {value: 1, name: "Fixed - Roof Mounted"},
    {value: 2, name: "1-Axis"},
    {value: 3, name: "1-Axis Backtracking"},
    {value: 4, name: "2-Axis"}
  ]
};

/**
 * Call nrel pvwatts api v5
 *
 * @param data
 * @returns {*}
 */
export var callPVWatts = function (data) {
  var requiredFields = ['system_capacity', 'module_type', 'losses', 'array_type', 'tilt', 'azimuth', 'address'];
  var requestData = {};
  var dataOk = true;
  data['format'] = 'json';
  data['api_key'] = config.PVWatts.apiKey;

  requiredFields.forEach(function (field) {
    if (Ember.isEmpty(data[field])) {
      dataOk = false;
    } else {
      requestData[field] = data[field];
    }
  });

  if (!dataOk) {
    return null;
  }

  for (var key in data) {
    if (data[key] !== null && data[key] !== undefined) {
      requestData[key] = data[key];
    }
  }

  return Ember.$.getJSON(config.PVWatts.host, data);
};


export default DS.Model.extend({
  system_capacity: DS.attr(),
  module_type: DS.attr(),
  array_type: DS.attr(),
  losses: DS.attr(),
  tilt: DS.attr(),
  azimuth: DS.attr(),
  dc_ac_ratio: DS.attr(),
  inv_eff: DS.attr(),
  gcr: DS.attr(),

  ac_monthly: DS.attr(),
  poa_monthly: DS.attr(),
  solrad_monthly: DS.attr(),
  dc_monthly: DS.attr(),
  ac_annual: DS.attr(),
  solrad_annual: DS.attr()
});
