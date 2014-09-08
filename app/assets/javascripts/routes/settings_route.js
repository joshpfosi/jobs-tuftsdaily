App.SettingsRoute = Em.Route.extend({
  model: function() {
    return this.store.find('daily_member');
  }
});
