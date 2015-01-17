import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.filter('job', { equal_state: 6 }, function(job) {
      return job.get('state') === 6;
    });
  }
});
