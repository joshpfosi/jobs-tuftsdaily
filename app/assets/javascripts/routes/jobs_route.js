App.JobsRoute = Em.Route.extend({
  beforeModel: function() {
    this.store.find('job').then(function(jobs) {
      jobs.forEach(function(job) {
        var currentTime = new Date().getTime(), publishDate = job.get('publishDate');
        if (publishDate < currentTime) { // past publish date
          job.set('state', 6);           // archive the job
          job.save();
        }
      });
    });
  },
  model: function() {
    return this.store.filter('job', {state: 0}, function(job) {
      return job.get('state') !== 6;
    });
  },
  setupController: function(controller, model) {
    this.store.find('daily_member').then(function(members) {
      controller.set('daily_members', members); // for use in drop down 
    });
    controller.set('model', model);
  }
});
