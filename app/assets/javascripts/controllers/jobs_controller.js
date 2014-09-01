App.JobsController = Em.ArrayController.extend({
  mailJobAssign: [
      Ember.Object.create({title: 'Submit', clicked:"mailJobAssign"}),
      Ember.Object.create({title: 'Cancel', clicked: 'closeMailModal', dismiss: 'modal'})
  ],
  mailJobReject: [
      Ember.Object.create({title: 'Submit', clicked:"mailJobReject"}),
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
     Ember.Object.create({value: 'dueTime',      name: 'Due Time'  }),
  ],
  filters: [
    { name: "All",        state: null },
    { name: "Unassigned", state: 0    },
    { name: "Assigned",   state: 1    },
    { name: "Rejected",   state: 2    },
    { name: "Completed",  state: 3    },
  ],
  filter: null,
  sortProperty: 'id',
  sortDirection: true, // ascending by default

  filteredJobs: function() {
    var jobs = this.get('content'), filter = this.get('filter'),
        sortProperty = this.get('sortProperty'), sortDirection = this.get('sortDirection');

    // if filter selected, apply filterBy, otherwise don't
    jobs = (filter !== null) ? sortColumns(sortProperty, jobs.filterBy('state', filter)) : sortColumns(sortProperty, jobs.get('content'));
    
    // if descending, reverse array
    return (sortDirection) ? jobs : jobs.reverse();
  }.property('content', 'content.@each.state', 'filter', 'sortProperty', 'sortDirection'),

  selectedJobs: Em.computed.filterBy('content', 'selected'),
  selectedDailyMember: null,
  isSelectedJobs: Em.computed.empty('selectedJobs'),
  isSelectedDailyMember: Em.computed.empty('selectedDailyMember'),
  isAssignable: Em.computed.or('isSelectedDailyMember', 'isSelectedJobs'),

  actions: {
    toggleSort: function(column) {
      if (this.get('sortProperty') === column) {
        this.toggleProperty('sortDirection');
      } else {
        this.set('sortProperty', column);
        this.set('sortDirection', true);
      }
    },
    markCompleted: function() {
      this.get('selectedJobs').slice().map(function(job) {
        job.set('selected', false); // uncheck box
        job.set('state', 3);        // set to complete
        job.save();
      });
    },
    markInvestigated: function() {
      this.get('selectedJobs').slice().map(function(job) {
        job.set('selected', false); // uncheck box
        job.set('state', 4);        // set to investigated
        job.save();
      });
    },
    showMailModal: function(type) {
      var job = this.get('selectedJobs')[0].get('data'), 
          deadline = job.dueDate + " " + job.dueTime;
      if (type === "assign") {
        var member = this.get('selectedDailyMember.data'),
            name = member.name;
        this.set('email', member.email);

        this.set('subject', generateSubjectAssign(job.coverageType, deadline));
        this.set('body', generateBodyAssign(name, job.coverageType, job.contact, 
              deadline, job.loc, job.time, job.details));

        Bootstrap.ModalManager.open('mailModal', 'Assign Job: ' +
            job.title, 'mail_assign', this.mailJobAssign, this);
      }
      else { // type === 'reject'
        this.set('email', job.email);
        this.set('subject', generateSubjectReject(job.coverageType));
        this.set('body', generateBodyReject(job.fullName, job.coverageType, 
              job.details, deadline, new Date(job.timestamp), job.id));

        Bootstrap.ModalManager.open('mailModal', 'Reject Job: ' + job.title, 
            'mail_reject', this.mailJobReject, this);
      }
    },
    closeMailModal: function() {
      this.set('reason', '');
      this.set('subject', '');
      this.set('body', '');
    },
    mailJobAssign: function() {
      var controller = this,
          job = this.get('selectedJobs')[0],
          member = this.get('selectedDailyMember'),
          email = this.get('email'), 
          deadline = job.get('dueDate') + " " + job.get('dueTime'),
          data = { 
            email:        email,
            subject:      this.get('subject'),
            name:         member.get('name'),
            coverageType: job.get('coverageType'),
            contact:      job.get('contact'),
            deadline:     deadline,
            loc:          job.get('loc'),
            time:         job.get('time'),
            details:      job.get('details')
          };

      $.ajax({
        type: "POST",
        url: '/mail_job?type=assign',
        data: data,
        success: function(response) {
          controller.send('closeMailModal'); // clear the input fields
          job.set('selected', false); // uncheck the check box
          job.set('state', 1); // assign it

          // establish associations
          currentMem = job.get('daily_member'); // unassign old member
          if (currentMem !== null) currentMem.get('jobs').removeObject(job); 
          job.set('daily_member', member);                // assign new one
          job.save();

          member.get('jobs').pushObject(job);
          member.save();

          return Bootstrap.NM.push('Successfully sent email to ' + email + ' regarding job ' + job.get('title') + '.', 'success');
        },
        error: function(response) {
          return Bootstrap.NM.push('Failed to send email to ' + email + ' regarding job ' + job.get('title') + '.', 'danger');
        },
        dataType: 'json'
      });
      return Bootstrap.ModalManager.close('mailModal');
    },
    mailJobReject: function() {
      var controller = this,
          job = this.get('selectedJobs')[0], 
          deadline = job.get('dueDate') + " " + job.get('dueTime'),
          data = {
            email:        job.get('email'),
            subject:      this.get('subject'),
            name:         job.get('fullName'),
            coverageType: job.get('coverageType'),
            deadline:     deadline,
            timestamp:    new Date(job.get('timestamp')),
            details:      job.get('details'),
            reason:       this.get('reason'),
            id:           job.get('id')
          };

      $.ajax({
        type: "POST",
        url: '/mail_job?type=reject',
        data: data,
        success: function(response) {
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

          return Bootstrap.NM.push('Successfully sent email to ' + job.get('email') + ' regarding job ' + job.get('title') + '.', 'success');
        },
        error: function(response) {
          return Bootstrap.NM.push('Failed to send email to ' + email + ' regarding job ' + job.get('title') + '.', 'danger');
        },
        dataType: 'json'
      });
      return Bootstrap.ModalManager.close('mailModal');
    },
  },
});
