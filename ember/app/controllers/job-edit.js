import Ember from 'ember';

export default Ember.ObjectController.extend({
  isOther: Ember.computed.equal('coverageType', 'Other'),

  actions: {
    save: function(model) {
      if (this.get('isOther')) {
        this.set('coverageType', this.get('coverageTypeOther'));
      }

      var controller = this;
      model.set('state', 0); // make it unassigned
      model.save().then(function(job) {
        Ember.$.ajax({
          type: 'POST',
          url: 'api/mail_job?type=update_job',
          data: { job: job },
          success: function() {
            controller.notify.success('Successfully notified administrator.');
            controller.transitionToRoute('jobs');
          },
          error: function() {
            controller.notify.alert('Failed to notify the administrator.');
          },
          dataType: 'json'
        });

        controller.notify.success('Successfully saved the job.');
      }, function() {
        controller.notify.alert('Failed to save the job.');
      });
    }
  },
});
