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

function mailJobReject() {
  var controller = this,
      job        = this.get('selectedJobs')[0], 
      deadline   = job.get('dueDate'),
      email      = job.get('email'),
      data = {
        email:        email,
        subject:      this.get('subject'),
        name:         job.get('fullName'),
        coverage_type: job.get('coverageType'),
        title:        job.get('title'),
        deadline:     deadline,
        timestamp:    job.get('createdAt'),
        details:      job.get('details'),
        reason:       this.get('reason'),
        id:           job.get('id')
      };

  Ember.$.ajax({
    type: "POST",
    url: 'api/mail_job?type=reject',
    data: data,
    success: function() {
      controller.send('closeMailModal'); // clear the input fields
      job.set('selected', false); // uncheck the check box
      job.set('state', 2); // reject it

      // clear associations
      var member = job.get('daily_member');
      // if assigned, remove job from daily_member and daily_member from job
      if (member !== null) { 
        member.get('jobs').removeObject(job);
        member.save();
        job.set('daily_member', null);
      }
      job.save();

      controller.notify.success('Successfully sent email to ' + job.get('email') + ' regarding job ' + job.get('title') + '.');
    },
    error: function() {
      controller.notify.danger('Failed to send email to ' + email + ' regarding job ' + job.get('title') + '.');
    },
    dataType: 'json'
  });
  Bootstrap.ModalManager.close('mailModal');
}

export default Ember.ArrayController.extend({
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

  selectedJobs: Ember.computed.filterBy('content', 'selected'),
  isSelectedJobs: Ember.computed.empty('selectedJobs'),

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
