import Ember from 'ember';

export default Ember.Component.extend({

  proposal: undefined,
  chart: undefined,

  didInsertElement: function() {
    this._computeChart();
  },

  _computeChart: function () {
    var data = {
      labels: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"],
      datasets: []
    },
      calendar = this.get('proposal.calendar'),
      currentData = [],
      currentColor,
      currentValue;

    this.get('proposal.items')
      .filterBy('selected', true)
      .forEach(function(item) {
        currentData = [];
        currentColor = item.get('rgbColor').join(', ');
        calendar.forEach(function(month) {
          currentValue = item.get('savingsCalculation.monthlyKwhSavings.' + month);

          if (currentValue) {
            currentValue = currentValue.toFixed(2);
          }

          currentData.push(currentValue);
        });

        data.datasets.push({
          data: currentData,
          fillColor: "rgba(" + currentColor +", 0.5)",
          strokeColor: "rgba(" + currentColor + ", 0.8)",
          highlightFill: "rgba(" + currentColor + ", 0.75)",
          highlightStroke: "rgba(" + currentColor + ", 1)",
          label: item.get('marketItem.product.name')
        })
    });

    var chartId = this.get("chart-id");
    var ctx = document.getElementById(chartId).getContext("2d");
    var chart = new Chart(ctx).Bar(data);

    this.set('chart', chart);
  }
});
