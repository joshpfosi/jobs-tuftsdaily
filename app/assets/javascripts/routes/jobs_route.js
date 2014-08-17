App.JobsRoute = Em.Route.extend({
  model: function() {
    return this.store.find('job').then(function(jobs) {
      return jobs;
    });
  }
});
