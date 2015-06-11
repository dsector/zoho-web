import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    /**
     *
     *
     */
    addItem: function()
    {
      this.get('model').get('items').addObject(this.get('item'));
      this.set('item', this.store.createRecord('market-profile/item'));
    },

    saveProfile: function()
    {
      this.get('model').save().then(function() {
        this.set('model', this.generateNewModel());
      }.bind(this));
    },

    deleteSavedItem: function(profle, item)
    {
      this.store.deleteRecord(item);

      profle.save().then(function() {

      });
    }
  },

  generateNewModel: function() {
    return this.store.createRecord('market-profile/profile');
  }
});
