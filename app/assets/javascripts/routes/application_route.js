App.ApplicationRoute = Ember.Route.extend({
  beforeModel: function() {
    var route = this;

    // go to loading while post request is processed,
    // if signedIn, go to jobs, otherwise go to index
    route.transitionTo('loading');
    Ember.$.post('/users/sign_in', function() {
      route.transitionTo('jobs');
      route.controllerFor('application').set('signedIn', true);
    }).fail(function() {
      route.transitionTo('index');
      route.controllerFor('application').set('signedIn', false);
    });
  }
});
