App.JobsRoute = Em.Route.extend({
  model: function() {
    return this.store.find('job').then(function(jobs) {
      return jobs;
    });
  },
  setupController: function(controller, model) {
    this.controllerFor('application').set('isJobs', true);
    controller.set('model', model);
  }
});
