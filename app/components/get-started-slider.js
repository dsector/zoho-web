import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    setSlide: function(slide) {
      this.sendAction('action', slide);
    }
  }
});
