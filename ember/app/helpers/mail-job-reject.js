import Ember from 'ember';

export function mailJobReject() {
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
    url: '/mail_job?type=reject',
    data: data,
    success: function() {
      controller.send('closeMailModal'); // clear the input fields
      job.set('selected', false); // uncheck the check box
      job.set('state', 2); // reject it

      // clear associations
      var member = job.get('daily_member');
      // if assigned, remove job from daily_member and daily_member from job
      if (member !== null) { 
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
  Bootstrap.ModalManager.close('mailModal');
}

export default Ember.Handlebars.makeBoundHelper(mailJobReject);
