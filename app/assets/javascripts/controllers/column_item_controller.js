App.ColumnItemController = Em.ObjectController.extend({
  sortProperty: Ember.computed.alias('parentController.sortProperty'),
  sortAscending: Ember.computed.alias('parentController.sortDirection'),
  sortDescending: Ember.computed.not('sortAscending'),
  
  isSorted: (function() {
    return this.get('sortProperty') === this.get('value');
  }).property('sortProperty', 'value'),
  
  sortedAsc: Ember.computed.and('sortAscending', 'isSorted'),
  sortedDesc: Ember.computed.and('sortDescending', 'isSorted')
});
