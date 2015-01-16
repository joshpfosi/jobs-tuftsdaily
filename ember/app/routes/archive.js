import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.filter('job', { state: 'archived' }, function(job) {
      return job.get('state') === 6;
    });
  }
});
