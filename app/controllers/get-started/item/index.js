import Ember from 'ember';
import {values, callPVWatts} from '../../../models/proposal/pvwatt';

export default Ember.Controller.extend({

  next: true,
  prev: true,

  moduleTypes: values.module_type,
  arrayTypes: values.array_type,

  selectedMarketProfile: null,
  currentSlideName: "lookup",
  proposal: undefined,

  /**
   * Get the full path to a slide
   * @param name
   * @returns {string}
   */
  getSlideByName: function (name) {
    return "get-started/item/partials/" + name;
  },

  /**
   * Generates full name of the current slide
   * @returns {string}
   */
  currentSlide: function () {
    return this.getSlideByName(this.get('currentSlideName'));
  }.property('currentSlideName'),

  /**
   *
   */
  initProposalItems: function () {
    var items = this.get('selectedMarketProfile.items'),
      proposalItems = this.get('proposal.items');

    console.log("proposal items:", proposalItems);

    proposalItems.forEach(function(item) {
      this.get('proposal.items').removeObject(item);
    }.bind(this));

    console.log("proposal items 2:", proposalItems);

    items.forEach(function (item) {
      var newItem = this.store.createRecord('proposal/item');
        newItem.set('marketItem', item);
        newItem.set('calculation', this.store.createRecord('product/calculation'));
        newItem.set('percent', this.store.createRecord('product/percent'));
        newItem.set('kwh', this.store.createRecord('product/kwh'));
        proposalItems.addObject(newItem)
    }.bind(this));

  }.observes('selectedMarketProfile'),


  /**
   * Performs call to PVWatts
   */
  loadPVWatts: function () {
    var pvwatts = this.get('proposal.pvwatts'),
      address = this.get('model.address');

    if (!pvwatts) return false;

    var promise = callPVWatts({
      system_capacity: pvwatts.get('system_capacity'),
      module_type: pvwatts.get('module_type'),
      array_type: pvwatts.get('array_type'),
      losses: pvwatts.get('losses'),
      tilt: pvwatts.get('tilt'),
      azimuth: pvwatts.get('azimuth'),
      dc_ac_ratio: pvwatts.get('dc_ac_ratio'),
      inv_eff: pvwatts.get('inv_eff'),
      gcr: pvwatts.get('gcr'),
      address: address
    });

    console.log('Calling pvwatts');

    if (promise === null) {
      console.log('Calling pwvatts failed');
      return false;
    }

    promise.then(function (data) {
      console.log('Response from PVWatts: ', data);
      var out = data['outputs'];
      for (var k in out) {
        pvwatts.set(k, out[k]);
      }
    });

  }.observes('proposal.pvwatts.system_capacity',
    'proposal.pvwatts.module_type', 'proposal.pvwatts.array_type',
    'proposal.pvwatts.losses', 'proposal.pvwatts.tilt', 'proposal.pvwatts.azimuth',
    'proposal.pvwatts.dc_ac_ratio', 'proposal.pvwatts.inv_eff', 'proposal.pvwatts.gcr',
    'model.address'
  ),

  actions: {

    setSlide: function (slideName) {
      this.set('currentSlideName', slideName);
    },

    saveProposal: function() {
      this.get('proposal').save().then(function(proposal) {
        proposal.get('items').filterBy('id', null).invoke('deleteRecord');
      }.bind(this));
    }
  }
});
