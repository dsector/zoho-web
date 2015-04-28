import Ember from 'ember';

export default Ember.Controller.extend({

  test: 'some nice data',

  actions: {
    saveProposalToApi:function(obj){

      //show load bar
      NProgress.inc();

      //set the object received by the components and
      //attach this to current proposal
      var proposal = this.get('proposal');
      proposal.set(obj.key, obj.value);

      //we should be able to get the current potential here
      proposal.set('potential', this.model);

      var self = this;

      var saveSuccess = function(prop){
        //console.log(prop);
        self.set('proposal', prop);
        NProgress.done();
      }

      var saveFail = function(){
        //todo :)
      }

      proposal.save().then(saveSuccess);
    }
  }


});
