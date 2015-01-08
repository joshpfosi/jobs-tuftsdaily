// TODO - need to modulate this into 1 controller
App.StockController = Em.ArrayController.extend({
  mailJobReject: [
      Ember.Object.create({title: 'Submit', clicked: "mailJobReject"}),
      Ember.Object.create({title: 'Cancel', clicked: 'closeMailModal', dismiss: 'modal'})
  ],
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

  selectedJobs: Em.computed.filterBy('content', 'selected'),
  isSelectedJobs: Em.computed.empty('selectedJobs'),

  actions: {
    toggleSort: function(column) {
      if (this.get('sortProperty') === column) {
        this.toggleProperty('sortDirection');
      } else {
        this.set('sortProperty', column);
        this.set('sortDirection', true);
      }
    },
    changeState: function(state) {
      this.get('selectedJobs').slice().map(function(job) {
        job.set('selected', false); // uncheck box
        job.set('state', state);        // set to complete
        job.save();
      });
    },
    showMailModal: function(type) {
      var job = this.get('selectedJobs')[0].get('data'), 
          deadline = job.dueDate;
      if (type === "assign") {
        var member = this.get('selectedDailyMember.data'),
            name = member.name;
        this.set('email', member.email);

        this.set('subject', generateSubjectAssign(job.coverageType, deadline));
        this.set('body', generateBodyAssign(name, job.coverageType, job.contact, 
              deadline, job.loc, job.time, job.date, job.details));

        Bootstrap.ModalManager.open('mailModal', 'Assign Job: ' +
            job.title, 'mail_assign', this.mailJobAssign, this);
      }
      else { // type === 'reject'
        this.set('email', job.email);
        this.set('subject', generateSubjectReject(job.coverageType));
        this.set('body', generateBodyReject(job.fullName, job.coverageType, 
              job.details, deadline, job.createdAt, job.id));

        Bootstrap.ModalManager.open('mailModal', 'Reject Job: ' + job.title, 
            'mail_reject', this.mailJobReject, this);
      }
    },
    closeMailModal: function() {
      this.set('reason', '');
      this.set('subject', '');
      this.set('body', '');
    },
    mailJobReject: mailJobReject
  },
});
