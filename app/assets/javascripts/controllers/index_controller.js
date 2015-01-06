App.IndexController = Em.ObjectController.extend({
  sections: ['News', 'Features', 'Sports', 'Arts', 'Multimedia', 'Op-Ed'],
  coverageTypes: ['Portrait/Headshot', 'Event', 'Lecture', 'Feature Story', 'File Photo', 'Stock', 'Other'],
  isOther: Em.computed.equal('coverageType', 'Other'),
  
  actions: {
    save: function(model) {
      // disable to prevent double clicking until ajax returns
      $('.btn-block').addClass('disabled'); 

      if (this.get('isOther')) {
        this.setProperties({
          coverageType: this.get('coverageTypeOther'),
          timestamp:    new Date().getTime()
        });
      }

      var controller = this;
      this.get('model').save().then(function(job) {
        controller.set('model', controller.store.createRecord('job'));

        var editorEmail = getEditorEmail(job.get('section'));
        if (editorEmail === '') {
          throw "getEditorEmail called with invalid section" + job.get('section');
        }

        // send mail
        $.ajax({
          type: 'POST', url: '/mail_job?type=job',
          data: { job: job.get('data'), editorEmail: editorEmail },
          success: function(response) {
            $('.btn-block').removeClass('disabled'); 
            Bootstrap.NM.push('Successfully notified the administrator.', 'success');
          },
          error: function(response) {
            $('.btn-block').removeClass('disabled'); 
            Bootstrap.NM.push('Failed to notify the administrator - please contact him.', 'danger');
          },
          dataType: 'json'
        });
        Bootstrap.NM.push('Successfully submitted a job request.', 'success');
      }, function() { // failed to save job record
        $('.btn-block').removeClass('disabled'); 
        Bootstrap.NM.push('Failed to submit a job request.', 'danger');
      });
    }
  },
});
