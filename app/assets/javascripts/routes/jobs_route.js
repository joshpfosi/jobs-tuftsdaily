App.JobsRoute = Em.Route.extend({
  model: function() {
    return this.store.find('job').then(function(jobs) {
      return jobs;
    });
  },
  setupController: function(controller, model) {
    this.controllerFor('application').set('isJobs', true);
    this.store.find('daily_member').then(function(members) {
      // for use in drop down menu
      controller.set('daily_members', members);
    });
    controller.set('model', model);
  }
});
