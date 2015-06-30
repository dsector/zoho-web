import Ember from 'ember';

export default Ember.Controller.extend({

  newProfile: null,
  newItem: null,
  products: Ember.A([]),

  /**
   * Create a new market profile item for form binding
   *
   * @returns {*}
   */
  createNewItem: function() {
    var products = this.get('products');

    return Ember.Object.createWithMixins(Ember.Copyable, {
      product: products.objectAt(0),
      federal: null,
      state: null,
      utility: null,
      tax: null,
      rebates: null
    });
  },

  /**
   * Create a new profile object for form binding
   *
   * @returns {*}
   */
  createNewProfile: function() {
    return Ember.Object.createWithMixins(Ember.Copyable, {
      name: null,
      items: Ember.A([])
    });
  },

  actions: {

    addItem: function() {
      this.get('newProfile').items.pushObject(this.get('newItem'));
      this.set('newItem', this.createNewItem());
    },

    /**
     * Push a new profile to the server
     *
     */
    saveProfile: function() {
      var profile = this.store.createRecord('market-profile/profile'),
        newProfile = this.get('newProfile'),
        newItems = newProfile.get('items'),
        store = this.store;

      console.log('new items:' , newItems);

      profile.setProperties(newProfile.getProperties('name'));

      newItems.forEach(function(item) {
        var newItem = store.createRecord('market-profile/item');
        newItem.setProperties(item);
        profile.get('items').addObject(newItem);
      });

      profile.save().then(function(savedProfile){
        savedProfile.get('items').filterBy('id', null).invoke('deleteRecord');
        this.set('newProfile', this.createNewProfile());
        this.set('newItem', this.createNewItem());
      }.bind(this));
    },

    deleteSavedItem: function(profle, item) {
      this.store.deleteRecord(item);
    },

    deleteSavedProfile: function(profile) {
      profile.destroyRecord();
    },

    editSavedProfile: function(profile) {
      this.set('model', profile);
    },

    updateSavedProfile: function(profile) {
      profile.save();
    }
  },

  generateNewModel: function() {
    return this.store.createRecord('market-profile/profile');
  }
});
