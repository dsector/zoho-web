import Ember from 'ember';

export default Ember.Component.extend({

  width: 800,
  height: 400,
  firstCalendar: Ember.Object.create(),
  secondCalendar: Ember.Object.create(),

  getCalendarData: function(calendar) {
    var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'],
      data = [];

    months.forEach(function(month) {
      data.push(calendar.get(month) || 0);
    });

    return data;
  },

  didInsertElement: function () {
    this.computeChart();
  },

  onMonthChanged: function() {
    this.computeChart();
  }.observes('firstCalendar.changedMonths', 'secondCalendar.changedMonths'),


  computeChart: function() {
    var firstCalendar = this.get('firstCalendar');
    var secondCalendar = this.get('secondCalendar');

    console.log("first calendar", firstCalendar);
    console.log("second calendar", secondCalendar);

    if (!firstCalendar || !secondCalendar) {
      return;
    }

    var firstCalendarData = this.getCalendarData(firstCalendar);
    var secondCalendarData = this.getCalendarData(secondCalendar);

    console.log("Calendar datas:", firstCalendarData, secondCalendarData);

    var chartId = this.get("chart-id");
    var ctx = document.getElementById(chartId).getContext("2d");

    var data = {
      labels: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.5)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(220,220,220,0.75)",
          highlightStroke: "rgba(220,220,220,1)",
          data: firstCalendarData,

        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: secondCalendarData
        }
      ]
    };


    if (this.get('on-modal') != null) {
      Ember.$(this.get('on-modal')).on('shown.bs.modal', function (event) {
        var myBarChart = new Chart(ctx).Bar(data);
      });

    } else {
      var myBarChart = new Chart(ctx).Bar(data);
    }
  }

});
