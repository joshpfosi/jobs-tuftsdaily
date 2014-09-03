App.ArchiveRoute = Em.Route.extend({
  model: function() {
    return this.store.filter('job', {state: 0}, function(job) {
      return job.get('state') === 6;
    });
  }
});
