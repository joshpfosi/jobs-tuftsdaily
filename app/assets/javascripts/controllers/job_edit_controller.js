App.JobEditController = Em.ObjectController.extend({
  isOther: Em.computed.equal('coverageType', 'Other'),
  
  actions: {
    save: function(model) {
      if (this.get('isOther')) this.set('coverageType', this.get('coverageTypeOther'));

      if (validate(this, this.get('validations'))) {
        var controller = this, model = this.get('model')
        model.save().then(function() {
          var arg = {
            type: 'POST',
            url: '/mail_job?type=job',
            data: {
              job: model.get('data')
            },
            success: function(response) {
              Bootstrap.NM.push('Successfully notified administrator.', 'success');
              controller.transitionToRoute('jobs');
            },
            error: function(response) {
              return Bootstrap.NM.push('Failed to notify the administrator.', 'danger');
            },
            dataType: 'json'
          };
          $.ajax(arg);
          return Bootstrap.NM.push('Successfully saved the job.', 'success');
        }, function() {
          return Bootstrap.NM.push('Failed to save the job.', 'danger');
        });
      }
    }
  },
});
