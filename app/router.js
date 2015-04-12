import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('login');

  this.route('crm', function() {
    this.route('zoho', function() {
      this.route('potentials', function(){
        this.route('view', {path: '/:potential_id'});
      });

    });
  });
});
