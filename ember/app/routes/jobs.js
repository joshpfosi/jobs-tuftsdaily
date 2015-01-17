import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('job', { not_equal_state: 6 });
  },
  setupController: function(controller, model) {
    controller.set('model', model);
    this.store.find('daily_member').then(function(members) {
      controller.set('daily_members', members); // for use in drop down 
    });
  }
});
