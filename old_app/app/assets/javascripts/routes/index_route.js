App.IndexRoute = Em.Route.extend({
  model: function() {
    return this.store.createRecord('job');
  },
  actions: {
    willTransition: function() {
      this.controllerFor('index').get('model').deleteRecord();
    }
  }
});
