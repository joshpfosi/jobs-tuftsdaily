App.JobsRoute = Em.Route.extend({
  model: function() {
    return this.store.filter('job', {state: 0}, function(job) {
      var currentTime = new Date().getTime(), publishDate = job.get('publishDate');
      if (publishDate < currentTime) { // past publish date
        job.set('state', 6);           // archive the job
      }
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
