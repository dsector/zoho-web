import Ember from 'ember';

export default Ember.Controller.extend({

  test: 'some nice data',

  actions: {
    saveProposalToApi:function(){

      var proposal = this.get('proposal');

      var self = this;

      var saveSuccess = function(prop){
        console.log(prop);
        self.set('proposal', prop);
      }

      var saveFail = function(){

      }

      proposal.save().then(saveSuccess);
    }

  }


});
