import Ember from 'ember';

export default Ember.Component.extend({

  nameSpace: "components/presentation-slider",
  slides: [
    'introduction',
    'electricity-usage',
    'energy-production'
  ],
  currentSlideIndex: 0,

  currentSlide: function() {
    var names = this.get('slides'),
      index = this.get('currentSlideIndex'),
      nameSpace = this.get('nameSpace');

    return nameSpace + '/' + names[index];

  }.property('currentSlideIndex'),

  hasNextSlide: function() {
    var index = this.get('currentSlideIndex'),
      length = this.get('slides').length;

    return index < length - 1;
  }.property('currentSlideIndex'),

  hasPrevSlide: function() {
    var index = this.get('currentSlideIndex');

    return index > 0;
  }.property('currentSlideIndex'),

  actions: {
    setSlide: function(direction) {
      var index = this.get('currentSlideIndex'),
        length = this.get('slides').length;

      if (direction === 'next' && index < length - 1) {
        this.set('currentSlideIndex', index + 1);
      } else if (direction === 'prev' && index > 0) {
        this.set('currentSlideIndex', index - 1);
      }
    }
  }
});
