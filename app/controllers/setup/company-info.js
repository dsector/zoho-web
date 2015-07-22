import Ember from 'ember';

export default Ember.Controller.extend({

  settings: Ember.Object.create({
    companyName: undefined,
    address: undefined,
    phone: undefined,
    email: undefined,
    license: undefined,
    grossProfitMargin: undefined
  }),

  settingsNames: [
    'companyName', 'companyAddress', 'companyPhone', 'companyEmail', 'companyLicense', 'companyGrossProfitMargin'
  ],

  actions: {
    save: function() {
      var prop = this.get('settingsNames'),
        setting, self = this;

      prop.forEach(function(name) {
        setting = self.settings.get(name);

        setting.save(function(saved) {
          if (!setting.get('id')) {
            store.deleteRecord(setting);
            self.settings.set(name, saved);
          }
        });
      });
    }
  }

});
