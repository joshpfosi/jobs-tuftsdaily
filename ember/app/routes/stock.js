import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.filter('job', { coverageType: 'stock' }, function(job) {
      var coverageType = job.get('coverageType');
      return (coverageType === 'File Photo' || 
              coverageType === 'Stock') && 
              job.get('state') !== 6;
    });
  }
});
