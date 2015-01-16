import Ember from 'ember';

export function sortColumns(column, array) {
  if (!array) {
    throw "Cannot call sortColumns() with null array";
  }

  switch (column) {
    case 'id':
      return array.sort(function(a, b) {
        return parseInt(a.get('id')) - parseInt(b.get('id'));
      });
    case 'dueDate':
      return array.sort(function(a, b) { // covert date to integers
        return new Date(a.get('dueDate')).getTime() - 
        new Date(b.get('dueDate')).getTime();
      });
    default:
      return array.sortBy(column);
  }
}

export default Ember.Handlebars.makeBoundHelper(sortColumns);
