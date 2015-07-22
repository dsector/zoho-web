import Ember from 'ember';

export default Ember.Component.extend({

  isFullScreen: false,

  barChartStyle: function() {
    var is = this.get('isFullScreen');

    if (is) {
      return "width: 100%;height: 400px;";
    } else {
      return "width: 100%; height: 400px;";
    }
  }.property('isFullScreen'),

  nameSpace: "components/presentation-slider",
  slides: [
    'introduction',
    'electricity-usage',
    'energy-reduction',
    'energy-production'
  ],
  footers: [
    'electricity-usage',
    'energy-reduction',
    'energy-production'
  ],

  currentSlideIndex: 0,

  currentSlideName: function () {
    var names = this.get('slides'),
      index = this.get('currentSlideIndex');

    return names[index];
  }.property('currentSlideIndex'),

  currentSlide: function () {
    var name = this.get('currentSlideName'),
      nameSpace = this.get('nameSpace');

    return nameSpace + '/' + name;

  }.property('currentSlideName'),

  currentSlideFooter: function () {
    var name = this.get('currentSlideName'),
      footers = this.get('footers'),
      nameSpace = this.get('nameSpace');

    if (footers.indexOf(name) !== -1) {
      return nameSpace + '/' + name + '-footer';
    }

    return false;
  }.property('currentSlide'),

  hasNextSlide: function () {
    var index = this.get('currentSlideIndex'),
      length = this.get('slides').length;

    return index < length - 1;
  }.property('currentSlideIndex'),

  hasPrevSlide: function () {
    var index = this.get('currentSlideIndex');

    return index > 0;
  }.property('currentSlideIndex'),

  toggleFullscreenClass: function() {
    var element = this.$('#presentation-slider'),
      is = this.get('isFullScreen');

    if (is) {
      element.addClass('full-screen');
    } else {
      element.removeClass('full-screen');
    }
  }.observes('isFullScreen'),

  didInsertElement: function() {
    var elem = document.getElementById("presentation-slider"),
      self = this,
      exitHandler = function() {
        var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
        var fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled;

        if (!fullscreenElement)
        {
          self.set('isFullScreen', false);
        }
      };

    document.addEventListener('webkitfullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
  },

  actions: {
    setSlide: function (direction) {
      var index = this.get('currentSlideIndex'),
        length = this.get('slides').length;

      if (direction === 'next' && index < length - 1) {
        this.set('currentSlideIndex', index + 1);
      } else if (direction === 'prev' && index > 0) {
        this.set('currentSlideIndex', index - 1);
      }
    },

    goFullScreen: function() {
      var elem = document.getElementById("presentation-slider");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
      this.set('isFullScreen', true);
    },

    exitFullScreen: function() {
      this.set('isFullScreen', false);
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }
});
