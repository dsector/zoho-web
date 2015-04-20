/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

//bootstrap
app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map');

//datatables
app.import('bower_components/datatables/media/css/jquery.dataTables.css');
app.import('bower_components/datatables/media/css/jquery.dataTables.bootstrap.css');

app.import('bower_components/datatables/media/js/jquery.dataTables.js');
app.import('bower_components/datatables/media/js/jquery.dataTables.bootstrap.js');

//ember assets compilation
app.import('bower_components/ember/ember-template-compiler.js');

app.import('vendor/jarvis.min.js');

//d3pie chart
app.import('vendor/d3chart/d3.min.js');
app.import('vendor/d3chart/d3pie.min.js');

module.exports = app.toTree();
