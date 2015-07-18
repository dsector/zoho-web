import Ember from 'ember';

export default Ember.Component.extend({

  nameSpace: "components/presentation-slider",
  slides: [
    'introduction',
    'electricity-usage',
    'energy-production'
  ],
  footers: [
    'electricity-usage'
  ],

  currentSlideIndex: 0,

  currentSlideName: function() {
    var names = this.get('slides'),
      index = this.get('currentSlideIndex');

    return names[index];
  }.property('currentSlideIndex'),

  currentSlide: function() {
    var name = this.get('currentSlideName'),
      nameSpace = this.get('nameSpace');

    return nameSpace + '/' + name;

  }.property('currentSlideName'),

  currentSlideFooter: function() {
    var name = this.get('currentSlideName'),
      footers = this.get('footers'),
      nameSpace = this.get('nameSpace');

    if (footers.indexOf(name) !== -1) {
      return nameSpace + '/' + name + '-footer';
    }

    return false;
  }.property('currentSlide'),

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
