App.ApplicationRoute = Ember.Route.extend({
  beforeModel: function() {
    var route = this;

    // go to loading while post request is processed,
    // if signedIn, go to jobs, otherwise go to index
    Ember.$.post('/users/sign_in', function() {
      route.controllerFor('application').set('signedIn', true);
    }).fail(function() {
      route.controllerFor('application').set('signedIn', false);
    });
  }
});
