App.IndexRoute = Em.Route.extend({
  model: function() {
    return {
      timestamp: null,
      title: '',
      fullName: '',
      email: '',
      phone: '',
      contact: '',
      section: '',
      coverageType: '',
      dueDate: '',
      details: '',
      state: 0,
      loc: '',
      date: '',
      time: '',
    };
  },
  setupController: function(controller, model) {
    controller.set('model', model);
  }
});
