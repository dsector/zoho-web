import Ember from 'ember';
import months from '../../utils/months';

export default Ember.Component.extend({

  pvwatts: undefined,
  "chart-id": "barchart-pvwatts-monthly",

  didInsertElement: function() {
    this._setupChart();
  },

  _setupChart: function () {
    var monthlyData = this.get('pvwatts.ac_monthly') || [],
      data = {
        labels: months.names,
        datasets: [{
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: monthlyData
        }]
      };

    console.log('PVWATT:', monthlyData, data);

    var chartId = this.get("chart-id");
    var ctx = document.getElementById(chartId).getContext("2d");

    var chart = new Chart(ctx).Bar(data);
  }


});
