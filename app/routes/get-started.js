import Ember from 'ember';
import DS from 'ember-data';

export default Ember.Route.extend({

  controllerName: 'get-started',

  setupController: function (controller, potentials) {
    controller.set('potentials', potentials);

    controller.set('proposal', this.store.createRecord('proposal', {
      sample: 'dadadadvvv'
    }));

    controller.set('energy', this.store.createRecord('energy-efficiency'));

    controller.set('project-design', this.store.createRecord('proposal/project-design'));
  },

  model: function () {
    return this.store.findAll('potential');
  },

  deactivate: function() {
    /*
    this.store.unloadAll('proposal');
    this.store.unloadAll('potential');
    this.store.unloadAll('proposal/project-design');
    this.store.unloadAll('energy-efficiency');
    */
    //this.store.unloadRecord(this.get('proposal'));

    var proposals = this.store.all('proposal');

    proposals.forEach(function(i){
      i.unloadRecord();
    });

    var potentials = this.store.all('potential');

    potentials.forEach(function(i){
      i.unloadRecord();
    });


    /*
    this.store.find('proposal', '').then(function (proposal) {
      console.log(proposal);
    });
    */
    //this.store.destroy();

  }
});
