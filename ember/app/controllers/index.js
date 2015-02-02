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
  isntValid: Ember.computed.not('model.isValid'),
  
  actions: {
    save: function(callback) {
      var controller = this;
      var promise = this.get('model').save().then(function(job) {
        controller.set('model', controller.store.createRecord('job'));

        var editorEmail = getEditorEmail(job.get('section'));
        if (editorEmail === '') {
          throw "getEditorEmail called with invalid section" + job.get('section');
        }

        // send mail
        return Ember.$.ajax({
          type: 'POST', url: 'api/mail_job?type=job',
          data: { job: job.get('data'), editorEmail: editorEmail },
          success: function() {
            controller.notify.success('Successfully submitted a job request.');
            controller.notify.success('Successfully notified the administrator.');
            location.reload();
          },
          error: function() {
            controller.notify.alert('Failed to notify the administrator - please contact him.');
          },
          dataType: 'json'
        });
      }, function() { // failed to save job record
        controller.notify.alert('Failed to submit a job request.');
      });

      callback(promise);
    }
  },
});
