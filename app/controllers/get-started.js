import Ember from 'ember';

export default Ember.Controller.extend({

  test: 'some nice data',

  actions: {
    /**
     * this action will save a proposal to rest api
     * @param obj
     */
    saveProposalToApi:function(obj){

      //show load bar
      NProgress.inc();

      //set the object received by the components and
      //attach this to current proposal
      var proposal = this.get('proposal');
      proposal.set(obj.key, obj.value);

      //we should be able to get the current potential here
      proposal.set('potential', this.model);

      //console.log(proposal.get('potential').get('address'));
      //console.log(proposal.get('potential').get('id'));
      var self = this;

      var saveSuccess = function(model){
        //console.log(prop);
        self.set('proposal', model);

        NProgress.done();
      }

      var saveFail = function(){
        //todo :)
      }

      proposal.save().then(saveSuccess);
    },

    savePotentialToApi: function(data){
      var potential = data.potential;

      potential.save();
    }
  },


  potentialChanged: function(){
    console.log('daaaaa2232323232') ;
  }.observes('proposal')
});
