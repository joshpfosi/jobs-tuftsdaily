import Ember from 'ember';

export default Ember.ObjectController.extend({
  isOther: Ember.computed.equal('coverageType', 'Other'),

  isntValid: Ember.computed.not('model.isValid'),
  actions: {
    save: function(callback) {
      if (this.get('isOther')) {
        this.set('coverageType', this.get('coverageTypeOther'));
      }

      var model = this.get('model');
      var controller = this;
      model.set('state', 0); // make it unassigned

      var promise = model.save().then(function(model) {
        controller.notify.success('Successfully saved the job.');
        return Ember.$.ajax({
          type: 'POST', url: 'api/mail_job?type=update_job',
          data: { 
            title: model.get('title'),
            id:    model.get('id')
          },
          success: function() {
            controller.notify.success('Successfully notified administrator.');
            controller.transitionToRoute('jobs');
          },
          error: function() {
            controller.notify.alert('Failed to notify the administrator.');
          },
          dataType: 'json'
        });
      }, function() {
        controller.notify.alert('Failed to save the job.');
      });

      callback(promise);
    }
  },
});
