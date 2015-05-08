import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement: function () {

    var firstCalendar = this.get('firstCalendar');
    var secondCalendar = this.get('secondCalendar');

    console.log(firstCalendar);
    console.log(secondCalendar);

    if (firstCalendar == null || secondCalendar == null) {
      return;
    }

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
          data: [
            firstCalendar.jan,
            firstCalendar.feb,
            firstCalendar.mar,
            firstCalendar.apr,
            firstCalendar.may,
            firstCalendar.jun,
            firstCalendar.jul,
            firstCalendar.aug,
            firstCalendar.sep,
            firstCalendar.oct,
            firstCalendar.nov,
            firstCalendar.dec
          ]

        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: [
            secondCalendar.jan,
            secondCalendar.feb,
            secondCalendar.mar,
            secondCalendar.apr,
            secondCalendar.jun,
            secondCalendar.jul,
            secondCalendar.aug,
            secondCalendar.sep,
            secondCalendar.oct,
            secondCalendar.nov,
            secondCalendar.dec
          ]
        }
      ]
    };


    if (this.get('on-modal') != null) {
      Ember.$(this.get('on-modal')).on('shown.bs.modal', function (event) {
        console.log('ctttxxx');
        var myBarChart = new Chart(ctx).Bar(data);
      });

    } else {
      var myBarChart = new Chart(ctx).Bar(data);
    }


  }


});
