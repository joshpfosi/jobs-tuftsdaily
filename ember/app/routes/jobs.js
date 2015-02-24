import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.store.find('job', { not_equal_state: 6 });
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    this.store.find('dailyMember').then(function(members) {
      controller.set('dailyMembers', members); // for use in drop down 
    });
  }
});
