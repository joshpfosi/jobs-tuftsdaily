App.JobsController = Em.ObjectController.extend({
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
  }
});
