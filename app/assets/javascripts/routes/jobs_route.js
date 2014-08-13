App.JobsRoute = Em.Route.extend({
  model: function() {
    return {
      jobs: this.store.find('job'),
      daily_members: this.store.find('daily_member')
    };
  }
});
