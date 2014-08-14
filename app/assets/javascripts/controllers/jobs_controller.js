App.JobsController = Em.ObjectController.extend({
  newDailyMemberModalButtons: [
    Ember.Object.create({title: 'Create', clicked: 'createDailyMember'}),
    Ember.Object.create({title: 'Cancel', clicked: 'closeDailyMemberModal', dismiss: 'modal'})
  ],
  mailButtons: [
      Ember.Object.create({title: 'Submit', clicked:"mailJob"}),
      Ember.Object.create({title: 'Cancel', clicked: 'closeMailModal', dismiss: 'modal'})
  ],
  selectedJobs: Em.computed.filterBy('jobs', 'selected'),
  selectedDailyMember: null,
  isSelectedJobs: Em.computed.empty('selectedJobs'),
  filteredJobs: function() {
    var jobs = this.get('jobs'), filter = this.get('filter');
    return (filter !== null) ? jobs.filterBy('state', filter) : jobs;
  }.property('jobs', 'jobs.@each.state', 'filter'),
  filters: [{name: "All", state: null},
            {name: "Unassigned", state: 0},
            {name: "Assigned",   state: 1},
            {name: "Rejected",   state: 2},
            {name: "Completed",  state: 3},
           ],
  filter: null,

  actions: {
    showNewDailyMember: function() { return Bootstrap.ModalManager.show('newDailyMember'); },
    closeDailyMemberModal: function() {
      this.set('name', '');
      this.set('email', '');
      this.set('phone', '');
      this.set('position', '');
      this.set('errors', null);
    },
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
          that.set('name', '');
          that.set('email', '');
          that.set('phone', '');
          that.set('position', '');
        });
      //}
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
    mailJob: function() {
      // TODO needs validation
      var that = this,
          job = this.get('selectedJobs').slice(-1)[0], // close the last opened modal
          member = this.get('selectedDailyMember'),
          email = (member === null) ? this.get('email') : member.email,
          data = { email:   email,
                   subject: this.get('subject'),
                   body:    this.get('body') };

      $.ajax({
        type: "POST",
        url: '/mail_job',
        data: data,
        success: function(response) {
          console.log('mailer succeeded');
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
    createMailModal: function() {
      // if daily member selected, populate email field w/ their email
      if (this.get('selectedDailyMember') !== null)
        this.set('email', this.get('selectedDailyMember.email'));

      // for each selected job open a modal
      var that = this;
      this.get('selectedJobs').forEach(function(job) {
        // note unique modal name, so closing multiple modals is possible
        Bootstrap.ModalManager.open('mailModal' + job.get('id'), 'Send Mail for Job #' + job.get('title'), 'mail_job', that.mailButtons, that);
      });
    },
    closeMailModal: function() {
      this.set('subject', '');
      this.set('body', '');
    }
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
