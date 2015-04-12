/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

//bootstrap
app.import('bower_components/bootstrap/dist/js/bootstrap.js');
app.import('bower_components/bootstrap/dist/css/bootstrap.css');

//datatables
app.import('bower_components/datatables/media/css/jquery.dataTables.css');
app.import('bower_components/datatables/media/js/jquery.dataTables.js');
module.exports = app.toTree();
