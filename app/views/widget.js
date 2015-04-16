import Ember from 'ember';

export default Ember.View.extend({
  layoutName: 'views/widget',

  didInsertElement: function () {

    console.log("called once");

    $('.collapse').collapse();

    /*
    Ember.$('#widget-grid').jarvisWidgets({
      widgets: '.jarviswidget',
      localStorage: false
    });
    */
  },

  collapse: function(){
    if(this.get('collapsed')){
      return 'in';
    }
    return '';
  }.property('collapsed')
});
