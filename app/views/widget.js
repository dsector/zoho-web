import Ember from 'ember';

export default Ember.View.extend({
  templateName: 'views/widget',
  attributeBindings: ['cacat'],
  cacat: function(){
    console.log(this.get('cacat'));
  }.property()
});
