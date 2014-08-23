App.JobsRoute = Em.Route.extend({
  beforeModel: function() {
    var route = this;

    // go to loading while post request is processed,
    // if signedIn, go to jobs, otherwise go to index
    route.transitionTo('loading');
    Ember.$.post('/users/sign_in', function() {
      route.transitionTo('jobs');
      route.controllerFor('application').set('signedIn', true);
    }).fail(function() {
      route.transitionTo('index');
      route.controllerFor('application').set('signedIn', false);
    });
  },
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
