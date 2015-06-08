import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    /**
     *
     *2
     */
    addItem: function()
    {
      this.get('model').get('items').addObject(this.get('item'));
      this.set('item', this.store.createRecord('market-profile/item'));
      //this.get('model').save().then(function() {
      //
      //}.bind(this));
    }
  }
});
