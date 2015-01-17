import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    var route = this;
    Ember.$.post('/users/sign_in', function() {
      route.controllerFor('application').set('signedIn', true);
    }).fail(function() {
      route.controllerFor('application').set('signedIn', false);
      route.transitionTo('index');
    });

    return this.csrf.fetchToken();
  }
});
