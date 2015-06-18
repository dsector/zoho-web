import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  "use strict";

  this.route('login');

  this.route('crm', function() {
    this.route('zoho', function() {
      this.route('potentials', function(){
        this.route('view', {path: '/:potential_id'});
      });

    });
  });
  this.route('proposal', {path: 'proposal-lookup'}, function() {
    this.route('view-potential', {path: 'potential/:potential_id'}, function(){
      this.route('view-proposal', {path: 'proposal/:proposal_id'})
    });
  });
  this.route('get-started', function() {
    this.route('index', {path: '/'});

    this.route('item', {path: '/potential/:potential_id'}, function() {
      this.route('index', {path: '/'});
      this.route('market-profile');
      this.route('utility-data');
      this.route('address');
      this.route('energy-efficiency');
    });
  });
  this.route('about');
  this.route('presentation');

  this.route('setup', function() {
    this.route('market-profile');
    this.route('products-services');
    this.route('pv-watts');
    this.route('company-info');
    this.route('contract');
    this.route('marketprofile');
  });
});
