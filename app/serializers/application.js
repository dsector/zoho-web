import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: "id",

  attrs: {
    items: {
      embedded: 'always',
      serialize: 'records'
    },
    utilityUsage: {
      embedded: 'always',
      serialize: 'records'
    },
    product: {
      embedded: 'always',
      serialize: 'records'
    },
    marketProfile: {
      embedded: 'always',
      serialize: 'records'
    },
    potential: {
      serialize: 'records',
      embedded: 'always'
    },
    proposal: {
      embedded: 'always',
      serialize: 'records'
    },
    pvwatts: {
      embedded: 'always',
      serialize: 'records'
    },
    marketItem: {
      embedded: 'always',
      serialize: 'records'
    },
    calculation: {
      embedded: 'always',
      serialize: 'records'
    },
    kwh: {
      embedded: 'always',
      serialize: 'records'
    },
    percent: {
      embedded: 'always',
      serialize: 'records'
    }
  }
});
