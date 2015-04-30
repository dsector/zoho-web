import Ember from 'ember';

export default Ember.Controller.extend({

  test: 'some nice data',

  actions: {
    saveProposalToApi:function(obj){

      //console.log(obj);

      if(obj.key=='design'){
        console.log(obj.value.get('pricePerWatt'));
      }

      //show load bar
      NProgress.inc();

      //set the object received by the components and
      //attach this to current proposal
      var proposal = this.get('proposal');
      proposal.set(obj.key, obj.value);

      console.log("the id is = ", this.get('proposal').get('id'));

      //we should be able to get the current potential here
      proposal.set('potential', this.model);

      //console.log(proposal.get('potential').get('address'));
      //console.log(proposal.get('potential').get('id'));
      var self = this;

      var saveSuccess = function(model){
        //console.log(prop);
        self.set('proposal', model);
        console.log(model.get('id'));

        //self.transitionToRoute('get-started.item.proposal', model.get('id'));
        //console.log(obj.key);
        NProgress.done();
      }

      var saveFail = function(){
        console.log('saving failed!!!');
        //todo :)
      }

      proposal.save().then(saveSuccess);
    }
  }
});
