import Ember from 'ember';

export default Ember.Route.extend({
  controllerName: 'proposal',

  setupController: function(controller, proposals){
    controller.set('proposals', proposals);
    controller.set('potentials', this.store.all('potential'));

  },

  model: function(){
    return this.store.fetchAll('proposal');
  }

  /*
  actions: {
    viewPresentation: function(){
      console.log("rendereeeed");
      return this.render('setup', {
        //into: 'application',
        outlet: 'modal'
      });
    }
  }
  */

  /*
  activate: function(){
    this.store.unloadAll('potential');
    this.store.unloadAll('proposal/project-design');
    this.store.unloadAll('proposal');
    this.store.unloadAll('energy-efficiency');
  }
  */
});
