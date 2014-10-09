App.IndexRoute = Em.Route.extend({
  model: function(params) {
    return {
      timestamp: null,
      title: '',
      fullName: params.name,
      email: params.email,
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
