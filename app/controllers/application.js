import Ember from 'ember';

export default Ember.Controller.extend({
  currentPathName: function() {
    console.log(this.get('currentPath'));

    return this.get('currentPath');
  }.observes('currentPath')
});
