// TODO if its a reject, use the same showMailModal, but different mailButtons - such that the Submit mail button triggers mailJobReject instead of mailJobAssign
// and the templates are right (use a flag sent to openMailModal to choose which to use in each instance
App.JobsController = Em.ArrayController.extend({
  daily_members: function() {
    return this.store.find('daily_member');
  }.property(),

  // ----- SORTING and FILTERING TABLE COLUMNS ----- //
  columns: function() {
   return [
     Ember.Object.create({value: '',             name: ''}),
     Ember.Object.create({value: 'id',           name: '#'}),
     Ember.Object.create({value: 'title',        name: 'Title'}),
     Ember.Object.create({value: 'fullName',     name: 'Full Name'}),
     Ember.Object.create({value: 'email',        name: 'Email'}),
     Ember.Object.create({value: 'phone',        name: 'Phone'}),
     Ember.Object.create({value: 'section',      name: 'Section'}),
     Ember.Object.create({value: 'coverageType', name: 'Coverage'}),
     Ember.Object.create({value: 'dueDate',      name: 'Due Date'}),
     Ember.Object.create({value: 'dueTime',      name: 'Due Time'}),
     Ember.Object.create({value: 'details',      name: 'Details'}),
    ];
  }.property(),
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
  filters: [{name: "All", state: null},
            {name: "Unassigned", state: 0},
            {name: "Assigned",   state: 1},
            {name: "Rejected",   state: 2},
            {name: "Completed",  state: 3},
           ],
  filter: null,

  // ----- END of SORTING and FILTERING ----- //

  newDailyMemberModalButtons: [
    Ember.Object.create({title: 'Create', clicked: 'createDailyMember'}),
    Ember.Object.create({title: 'Cancel', clicked: 'closeDailyMemberModal', dismiss: 'modal'})
  ],
  mailButtons: [
      Ember.Object.create({title: 'Submit', clicked:"mailJob"}),
      Ember.Object.create({title: 'Cancel', clicked: 'closeMailModal', dismiss: 'modal'})
  ],
  selectedJobs: Em.computed.filterBy('content', 'selected'),
  selectedDailyMember: null,
  isSelectedJobs: Em.computed.empty('selectedJobs'),

  actions: {
    toggleSort: function(column) {
      if(this.get('sortProperty') == column) {
        this.toggleProperty('sortDirection');
      } else {
        this.set('sortProperty', column);
        this.set('sortDirection', true);
      }
    },
    markRejected: function() {
      this.get('selectedJobs').slice().map(function(job) {
        job.set('selected', false); job.set('state', 2);
      });
    },
    markCompleted: function() {
      this.get('selectedJobs').slice().map(function(job) {
        job.set('selected', false); job.set('state', 3);
      });
    },

    // ----- OPENING MODALS ----- //

    showNewDailyMember: function() {
      return Bootstrap.ModalManager.show('newDailyMember');
    },

    showMailModal: function() {
      // if daily member selected, populate email field w/ their email
      var job = this.get('selectedJobs')[0].get('data'), 
          member = this.get('selectedDailyMember.data'),
          name = "Enter a name";

      if (member !== null) {
        this.set('email', member.email);
        name = member.name;
      }
      else
        this.set('email', '');

      var deadline = job.dueDate + " " + job.dueTime;
      this.set('subject', generateSubject(job.coverageType, deadline));
      this.set('body', generateBody(name, job.coverageType, job.contact, 
                                    deadline, job.loc, job.time, job.details));

      Bootstrap.ModalManager.open('mailModal' + job.id, 'Send Mail for Job #' +
                                  job.title, 'mail_job', this.mailButtons, this);
    },

    // ----- END of OPENING MODALS ----- //

    // ----- CLOSING MODALS ----- //

    closeDailyMemberModal: function() {
      this.set('name', '');
      this.set('email', '');
      this.set('phone', '');
      this.set('position', '');
      this.set('errors', null);
    },
    closeMailModal: function() {
      this.set('subject', '');
      this.set('body', '');
    },

    // ----- END of CLOSING MODALS ----- //

    // ----- SUBMIT BUTTONS ----- //

    createDailyMember: function() {
      // TODO make validation work
      //if (validate(this, this.get('validations'))) {
        var newMember = this.store.createRecord('daily_member', {
          name: this.get('name'),
          position: this.get('position'),
          email: this.get('email'),
          phone: this.get('phone')
        });

        var that = this;
        newMember.save().then(function() {
          Bootstrap.NM.push('Succesfully added ' + that.get('name') + '.', 'success');
          that.set('name', '');
          that.set('email', '');
          that.set('phone', '');
          that.set('position', '');
        }, function() {
          return Bootstrap.NM.push('Failed to add ' + that.get('name') + '.', 'danger');
        });
        return Bootstrap.ModalManager.close('newDailyMember');
      //}
    },
    mailJob: function() {
      // TODO needs validation
      var that = this,
          job = this.get('selectedJobs')[0],
          member = this.get('selectedDailyMember'),
          email = this.get('email'), deadline = job.get('dueDate') + " " + job.get('dueTime'),
          data = { email:   email,
                   subject: this.get('subject'),
                   name: member.name,
                   coverageType: job.get('coverageType'),
                   contact: job.get('contact'),
                   deadline: deadline,
                   loc: job.get('loc'),
                   time: job.get('time'),
                   details: job.get('details') };

      $.ajax({
        type: "POST",
        url: '/mail_job?type=assigned',
        data: data,
        success: function(response) {
          that.send('closeMailModal'); // clear the input fields
          job.set('selected', false); // uncheck the check box
          job.set('state', 1); // assign it
          //member.get('jobs').pushObject(job);
          //member.save();
          return Bootstrap.NM.push('Successfully sent email to ' + email + ' regarding job ' + job.get('title') + '.', 'success');
        },
        error: function(response) {
          return Bootstrap.NM.push('Failed to send email to ' + email + ' regarding job ' + job.get('title') + '.', 'danger');
        },
        dataType: 'json'
      });
      return Bootstrap.ModalManager.close('mailModal' + job.get('id'));
      // TODO disable submit button when sending mail
    },
  },
  
  validations: {
    name: {
      regex: /^[A-Za-z0-9 ]{3,20}$/, 
      message: "Enter a name (min of 3 characters, max of 20)"
    },
    email: {
      regex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
      message: "Enter a valid email"
    },
    phone: {
      regex: /\d\d\d \d\d\d \d\d\d\d/,
      message: "Follow the placeholder exactly!"
    },
    position: {
      regex: /.*/,
      message: "Enter a position for this person"
    },
  }
});
