/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

//bootstrap
app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map');

//datatables
app.import('bower_components/datatables/media/css/jquery.dataTables.css');
app.import('vendor/datatables/dataTables.bootstrap.css');

app.import('bower_components/datatables/media/js/jquery.dataTables.js');
app.import('vendor/datatables/dataTables.bootstrap.js');

//ember assets compilation
app.import('bower_components/ember/ember-template-compiler.js');

// pace
app.import('bower_components/pace/pace.min.js');
app.import('bower_components/pace/themes/silver/pace-theme-flash.css');

app.import('vendor/jarvis.min.js');

//d3pie chart
app.import('vendor/d3chart/d3.min.js');
app.import('vendor/d3chart/d3pie.min.js');

//jquery-validation
app.import('bower_components/jquery-validation/dist/jquery.validate.js');
app.import('bower_components/jquery-validation/dist/additional-methods.js');

//pacejs
//app.import('vendor/pace.min.js');
app.import('bower_components/nprogress/nprogress.js');
app.import('bower_components/nprogress/nprogress.css');

//Chart.js
app.import('bower_components/Chart.js/Chart.js');
app.import('bower_components/Chart.js/src/Chart.Bar.js');
app.import('bower_components/Chart.js/src/Chart.Radar.js');

//Scrollspy
app.import('vendor/scrollspy.js');

module.exports = app.toTree();
