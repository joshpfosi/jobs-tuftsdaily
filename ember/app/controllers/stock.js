import Ember from 'ember';

export function generateSubjectReject(coverageType) {
  return "Your request for " + coverageType + " needs more detail";
}

export function generateBodyReject(name, coverageType, title, details, deadline, timestamp, id) {
  return "Dear " + name + ",\n\nYou have submitted a request:\n\nTitle: " + title + "\nCoverage Type: " + coverageType + "\nDescription: " + details + "\nDeadline: " + deadline + "\nSubmitted on: " + timestamp + "\n\nThank you for taking the time to do this. Unfortunately we are unable to cover your request.\n\n[Reason for rejection]\n\nPlease reply with any modification or additional ideas you may have, or edit the job request directly at:\n\n http://jobs-tuftsdaily.herokuapp.com/#/job/" + id + "\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n";
}

export default Ember.ArrayController.extend({
  selectedJobs: Ember.computed.filterBy('content', 'selected'),
  isNotSelectedJobs: Ember.computed.empty('selectedJobs'),

  actions: {
    changeState: function(state) {
      this.get('selectedJobs').slice().map(function(job) {
        job.set('selected', false); // uncheck box
        job.set('state', state);        // set to complete
        job.save();
      });
    },
    setupMailReject: function() {
      var job = this.get('selectedJobs')[0].get('data'), 
      deadline = job.dueDate;
      this.set('email', job.email);
      this.set('subject', generateSubjectReject(job.coverageType));
      this.set('body', generateBodyReject(job.fullName, job.coverageType, 
            job.title, job.details, deadline, job.createdAt, job.id));
    },
    mailJobReject: function () {
      var controller = this,
      job        = this.get('selectedJobs')[0], 
      deadline   = job.get('dueDate'),
      email      = job.get('email'),
      data = {
        email:        email,
        subject:      this.get('subject'),
        name:         job.get('fullName'),
        coverage_type: job.get('coverageType'),
        title:        job.get('title'),
        deadline:     deadline,
        timestamp:    job.get('createdAt'),
        details:      job.get('details'),
        reason:       this.get('reason'),
        id:           job.get('id')
      };

      Ember.$.ajax({
        type: "POST",
        url: 'api/mail_job?type=reject',
        data: data,
        success: function() {
          job.set('selected', false); // uncheck the check box
          job.set('state', 2); // reject it

          // clear associations
          var member = job.get('daily_member');
          // if assigned, remove job from daily_member and daily_member from job
          if (member !== undefined) { 
            member.get('jobs').removeObject(job);
            member.save();
            job.set('daily_member', null);
          }
          job.save();

          controller.notify.success('Successfully sent email to ' + job.get('email') + ' regarding job ' + job.get('title') + '.');
        },
        error: function() {
          controller.notify.danger('Failed to send email to ' + email + ' regarding job ' + job.get('title') + '.');
        },
        dataType: 'json'
      });
    }
  },
});
