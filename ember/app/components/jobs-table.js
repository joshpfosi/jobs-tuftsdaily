import Ember from 'ember'

// given a column and an array of jobs, returns the array sorted by the property
// given by column
function sortColumns(column, array) {
  if (!array) {
    console.log('sortColumns: passed null array. This has no effect.');
    return array;
  }

  switch (column) {
    case 'id':
      return array.get('content').sort(function(a, b) {
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

export default Ember.Component.extend({
  detailJob: null,
  hasDetailJobObs: function() {
    this.set('hasDetailJob', this.get('detailJob') !== null);
  }.observes('detailJob'),
  hasDetailJob: false,
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
  content: null,

  sortDirection: true, // ascending by default
  sortProperty: 'publishDate',
  sortedContent: function() {
    var jobs = this.get('content'), sortProperty = this.get('sortProperty'),
        sortDirection = this.get('sortDirection');

    jobs = sortColumns(sortProperty, jobs);
    
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
    },
    deleteJob: function(job) {
      job.destroyRecord();
    },
    setupDetailJob: function(job) {
      this.set('detailJob', job);
    },
  }
})
