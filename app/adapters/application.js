import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  namespace: 'api/1.0',
  host: 'http://socketo.com:8080'

  /*serializer: DS.RESTSerializer.extend({
    primaryKey: function(type) {
      return 'id';
    }
  })
  */
});
