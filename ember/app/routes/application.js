import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  beforeModel: function() {
    // ensure transition attempt it made, so sessionAuthenticatedRoute can retry
    this._super();
    return this.csrf.fetchToken();
  },
  actions: {
    sessionAuthenticationSucceeded: function() {
      this.transitionTo("jobs");
    }
  }
});
