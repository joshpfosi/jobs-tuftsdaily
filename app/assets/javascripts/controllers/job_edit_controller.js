App.JobEditController = Em.ObjectController.extend({
  isOther: Em.computed.equal('coverageType', 'Other'),
  
  actions: {
    save: function(model) {
      if (this.get('isOther')) this.set('coverageType', this.get('coverageTypeOther'));

      if (validate(this, this.get('validations'))) {
        var controller = this, model = this.get('model')
        model.save().then(function(job) {
          d = job.get('data');
          $.ajax({
            type: 'POST',
            url: '/mail_job?type=job',
            data: {
              timestamp:    d.timestamp,
              title:        d.title,
              fullName:     d.fullName,
              email:        d.email,
              phone:        d.phone,
              contact:      d.contact,
              section:      d.section,
              coverageType: d.coverageType,
              publishDate:  d.publishDate,
              dueDate:      d.dueDate,
              dueTime:      d.dueTime,
              details:      d.details,
              state:        d.state,
              loc:          d.loc,
              date:         d.date,
              time:         d.time
            },
            success: function(response) {
              Bootstrap.NM.push('Successfully notified administrator.', 'success');
              controller.transitionToRoute('jobs');
            },
            error: function(response) {
              return Bootstrap.NM.push('Failed to notify the administrator.', 'danger');
            },
            dataType: 'json'
          });
          return Bootstrap.NM.push('Successfully saved the job.', 'success');
        }, function() {
          return Bootstrap.NM.push('Failed to save the job.', 'danger');
        });
      }
    }
  },
});
