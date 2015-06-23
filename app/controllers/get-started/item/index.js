import Ember from 'ember';

export default Ember.Controller.extend({

  next: true,
  prev: true,

  selectedProfileId: null,
  currentSlideName: "lookup",

  /**
   * Get the full path to a slide
   * @param name
   * @returns {string}
   */
  getSlideByName: function(name) {
    return "get-started/item/partials/" + name;
  },

  /**
   * Generates full name of the current slide
   * @returns {string}
   */
  currentSlide: function() {
    return this.getSlideByName(this.get('currentSlideName'));
  }.property('currentSlideName'),

  actions: {

    setSlide: function(slideName) {
      console.log('slideName');
      this.set('currentSlideName', slideName);
    }
  }
});
