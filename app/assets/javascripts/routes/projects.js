App.ProjectsRoute = Em.Route.extend({
  model: function() {
    return this.store.find('project');
  }
});
