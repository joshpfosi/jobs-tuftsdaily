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
      dueTime: '',
      details: '',
      state: 0,
      loc: '',
      date: '',
      time: '',
    };
  }
});
