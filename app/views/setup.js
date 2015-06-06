import Ember from 'ember';

export default Ember.View.extend({

  didInsertElement: function() {
    var self = this;

    this.$('li a').click(function() {
      self.$('li').removeClass('active');
      $(this).parents('li').addClass('active');
    });
  }
});
