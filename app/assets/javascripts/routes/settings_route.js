App.SettingsRoute = Em.Route.extend({
  model: function() {
    return this.store.find('daily_member').then(function(members) {
      return members;
    });
  },
  setupController: function(controller, model) {
    this.controllerFor('application').set('isJobs', false);
    controller.set('model', model);
  }
});
