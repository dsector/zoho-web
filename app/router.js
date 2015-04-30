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
  this.route('proposal', function() {
    //this.route('view', {path: '/:potential_id'});
    this.route('item', {path: '/:potential_id'});
  });
  this.route('get-started', function() {
    this.route('item', {path: '/:potential_id'}, function() {
      this.route('proposal');
    });
  });
  this.route('about');
  this.route('presentation');
  this.route('setup');
});
