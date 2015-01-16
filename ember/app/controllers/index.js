import Ember from 'ember';

function getEditorEmail(section) {
  switch (section) {
    case 'News':
      return "tuftsdailynews@gmail.com";
    case 'Features':
      return "tuftsfeatures@gmail.com";
    case 'Sports':
      return "sports@tuftsdaily.com";
    case 'Arts':
      return "dzennir@aol.com";
    case 'Multimedia':
      return "tuftsdailymedia@gmail.com";
    case 'Op-Ed':
      return "tuftsdailyoped@gmail.com";
  }
  return ''; // should never occur
}

export default Ember.ObjectController.extend({
  sections: ['News', 'Features', 'Sports', 'Arts', 'Multimedia', 'Op-Ed'],
  coverageTypes: ['Portrait/Headshot', 'Event', 'Lecture', 'Feature Story', 'File Photo', 'Stock', 'Other'],
  isOther: Ember.computed.equal('coverageType', 'Other'),
  
  actions: {
    save: function(model) {
      // disable to prevent double clicking until ajax returns
      Ember.$('.btn-block').addClass('disabled'); 

      if (this.get('isOther')) {
        this.set('coverageType', this.get('coverageTypeOther'));
      }

      var controller = this;
      model.save().then(function(job) {
        controller.set('model', controller.store.createRecord('job'));

        var editorEmail = getEditorEmail(job.get('section'));
        if (editorEmail === '') {
          throw "getEditorEmail called with invalid section" + job.get('section');
        }

        // send mail
        Ember.$.ajax({
          type: 'POST', url: 'api/mail_job?type=job',
          data: { job: job.get('data'), editorEmail: editorEmail },
          success: function() {
            Ember.$('.btn-block').removeClass('disabled'); 
            controller.notify.success('Successfully notified the administrator.');
          },
          error: function() {
            Ember.$('.btn-block').removeClass('disabled'); 
            controller.notify.alert('Failed to notify the administrator - please contact him.');
          },
          dataType: 'json'
        });
        controller.notify.success('Successfully submitted a job request.');
      }, function() { // failed to save job record
        Ember.$('.btn-block').removeClass('disabled'); 
        controller.notify.alert('Failed to submit a job request.');
      });
    }
  },
});
