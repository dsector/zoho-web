import Ember from 'ember';
import Widget from 'zoho-web/views/widget';

export default Widget.extend({
  templateName: 'views/proposal/list',

  title: 'Customer Lookup',
  widgetId: 'customer-lookup-widget',

  didInsertElement: function () {
    this._super();


    Ember.$('#zoho-table').dataTable({
      fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        // Row click
        $(nRow).on('click', function () {
          //console.log('Row Clicked. Look I have access to all params, thank You closures.', this, aData, iDisplayIndex, iDisplayIndexFull);
        });

        // Cell click
        $('td', nRow).on('click', function () {
          //console.log('Col Clicked.', this, aData, iDisplayIndex, iDisplayIndexFull);
        });
      }

    });

  }
});
