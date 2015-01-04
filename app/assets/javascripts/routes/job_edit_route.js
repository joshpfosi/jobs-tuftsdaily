App.JobEditRoute = Em.Route.extend({
  model: function(params) {
    return this.store.find('job', params.job_id);
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('sections',      this.controllerFor('index').get('sections'));
    controller.set('coverageTypes', this.controllerFor('index').get('coverageTypes'));
  }
});
