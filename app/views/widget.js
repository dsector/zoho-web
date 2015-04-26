import Ember from 'ember';

export default Ember.View.extend({
  layoutName: 'views/widget',

  didInsertElement: function () {

    console.log("called once");

    $('.collapse').collapse();

  },

  collapse: function(){
    if(this.get('collapsed')){
      return 'in';
    }
    return '';
  }.property('collapsed')
});
