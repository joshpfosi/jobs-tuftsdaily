App.IndexRoute = Em.Route.extend({
  model: function() { return this.store.createRecord('job'); }
});
