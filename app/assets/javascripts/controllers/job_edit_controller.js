App.JobEditController = Em.ObjectController.extend({
  isOther: Em.computed.equal('coverageType', 'Other'),
  
  actions: {
    save: function(model) {
      if (this.get('isOther')) this.set('coverageType', this.get('coverageTypeOther'));

      if (validate(this, this.get('validations'))) {
        var controller = this;
        this.get('model').save().then(function() {
          Bootstrap.NM.push('Successfully saved the job.', 'success');
          controller.transitionToRoute('jobs');
        }, function() {
          return Bootstrap.NM.push('Failed to save the job.', 'danger');
        });
      }
    }
  },
});
