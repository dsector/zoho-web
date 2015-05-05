import Ember from 'ember';

export default Ember.Component.extend({

  didInsertElement: function () {

    this._super();

    console.log('bbb');

    /*
    Ember.$("#existing-pool-pump").rules('add', {
      minlength:2,
      required: true
    });
    */

    //Ember.$('#proposal-form').validate();

    //var rules = Ember.$('.proposal-form').rules();
    //console.log(rules);


    Ember.$(".editable").editable({
      success: function (response, newValue) {
      }
    });

    Ember.$(".editable").each(function(){
      if(Ember.$(this).text()==''){
        Ember.$(this).html('none');
      }
    });
  }
});
