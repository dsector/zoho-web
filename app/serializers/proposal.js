import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  //Force embedding the posts array into the payload to the server
  attrs: {
    potential: {
      serialize: 'records',
      embedded: 'always'
    },
    proposal: {
      embedded: 'always',
      serialize: 'records'
    }
  }
});
