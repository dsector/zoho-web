import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement: function () {

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
          data: [65, 59, 80, 81, 56, 55, 40, 22, 14, 43, 23, 8]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.5)",
          strokeColor: "rgba(151,187,205,0.8)",
          highlightFill: "rgba(151,187,205,0.75)",
          highlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90, 25, 50, 104, 22, 10]
        }
      ]
    };


    if (this.get('on-modal') != null) {
      $(this.get('on-modal')).on('shown.bs.modal', function (event) {
        console.log('ctttxxx');
        var myBarChart = new Chart(ctx).Bar(data);
      });

    } else {
      var myBarChart = new Chart(ctx).Bar(data);
    }


  }


});
