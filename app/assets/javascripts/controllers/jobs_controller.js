App.JobsController = Em.ObjectController.extend({
  newDailyMemberModalButtons: [
    Ember.Object.create({title: 'Create', clicked: 'createDailyMember'}),
    Ember.Object.create({title: 'Cancel', clicked: 'cancel', dismiss: 'modal'})
  ],
  selectedJobs: Em.computed.filterBy('jobs', 'selected'),
  selectedDailyEmail: null,
  isSelectedJobs: Em.computed.empty('selectedJobs'),
  isDailyEmail: Em.computed.empty('selectedDailyEmail'),
  isMailable: Em.computed.or('isSelectedJobs', 'isDailyEmail'),
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
    cancel: function() {
      this.set('name', '');
      this.set('email', '');
      this.set('phone', '');
      this.set('position', '');
      this.set('errors', null);
    },
    createDailyMember: function() {
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
      console.log(this.get('selectedJobs'));
      this.get('selectedJobs').map(function(job) {
        console.log(job);
        job.set('selected', false);
        job.set('state', 2);
      });
    },
    markCompleted: function() {
      this.get('selectedJobs').map(function(job) {
        job.set('selected', false);
        job.set('state', 3);
      });
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
