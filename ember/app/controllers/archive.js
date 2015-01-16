import Ember from 'ember';

// given a column and an array of jobs, returns the array sorted by the property
// given by column
function sortColumns(column, array) {
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

export default Ember.ArrayController.extend({
  columns: [
     Ember.Object.create({value: '',             name: ''          }), 
     Ember.Object.create({value: 'id',           name: '#'         }),
     Ember.Object.create({value: 'title',        name: 'Title'     }),
     Ember.Object.create({value: 'fullName',     name: 'Full Name' }),
     Ember.Object.create({value: 'email',        name: 'Email'     }),
     Ember.Object.create({value: 'phone',        name: 'Phone'     }),
     Ember.Object.create({value: 'section',      name: 'Section'   }),
     Ember.Object.create({value: 'coverageType', name: 'Coverage'  }),
     Ember.Object.create({value: 'publishDate',  name: 'Publish Date'  }),
     Ember.Object.create({value: 'dueDate',      name: 'Due Date'  }),
  ],
  sortProperty: 'id',
  sortDirection: true, // ascending by default

  filteredJobs: function() {
    var jobs = this.get('content'),
        sortProperty = this.get('sortProperty'), sortDirection = this.get('sortDirection');
    // if filter selected, apply filterBy, otherwise don't
    jobs = sortColumns(sortProperty, jobs.get('content'));
    
    // if descending, reverse array
    return (sortDirection) ? jobs : jobs.reverse();
  }.property('content', 'sortProperty', 'sortDirection'),

  actions: {
    toggleSort: function(column) {
      if (this.get('sortProperty') === column) {
        this.toggleProperty('sortDirection');
      } else {
        this.set('sortProperty', column);
        this.set('sortDirection', true);
      }
    }
  },
});
