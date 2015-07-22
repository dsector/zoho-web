import Ember from 'ember';

export default Ember.Controller.extend({

  settings: Ember.Object.create({
    dc_ac_ratio: undefined,
    inv_eff: undefined,
    gcr: undefined,
    system_size: undefined,
    system_production: undefined,
    ppw: undefined
  }),

  actions: {
    save: function() {
      var properties = [
        "dc_ac_ratio", "inv_eff", "gcr", "system_size", "system_production", "ppw"
      ], prop, model, store = this.store, self = this;

      for(prop in this.settings.getProperties(properties)) {
        model = this.settings.get(prop);
        model.save().then(function(saved) {
          if (!model.get('id')) {
            store.deleteRecord(model);
            self.settings.set(prop, saved);
          }
        });
      }
    }
  }
});
