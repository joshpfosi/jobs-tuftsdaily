import Ember from 'ember';

function generateSubjectAssign(coverageType, date, time) {
  if (date != null && time != null) {

  return "Tufts Daily Photo Assignment: " + coverageType + " on " + date + " @ " + time;
  }
  
  return "Tufts Daily Photo Assignment: " + coverageType;
}

export function generateBodyAssign(title, name, coverageType, contact, deadline, loc, time, date, details) {
  return "Dear " + name + ",\n\nPlease cover the following assignment and let me know if you are unable to.\n\nSlug: " + title + "\n\nEvent Details:\n\nCoverage type: <%= @coverage_type %>\nContact information for the subject: " + contact + "\nDue on the Photoshelter server by: " + deadline + "\n\nWhere: " + location + "\nWhen: " + date + " " + time + "\n\nDetails: " + details + "\nThank you for working on this assignment. If you have any questions please call Nick at 603-686-3733 or reply to this email. Please deliver all images onto the Photoshelter server via FTP by the specified deadline with captions, keywords, and proper toning. Full sized JPGs will suffice.\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n";
}

export function generateSubjectReject(coverageType) {
  return "Your request for " + coverageType + " needs more detail";
}

export function generateBodyReject(name, coverageType, title, details, deadline, timestamp, id) {
  return "Dear " + name + ",\n\nYou have submitted a request:\n\nTitle: " + title + "\nCoverage Type: " + coverageType + "\nDescription: " + details + "\nDeadline: " + deadline + "\nSubmitted on: " + timestamp + "\n\nThank you for taking the time to do this. Unfortunately we are unable to cover your request.\n\n[Reason for rejection]\n\nPlease reply with any modification or additional ideas you may have, or edit the job request directly at:\n\n http://jobs-tuftsdaily.herokuapp.com/#/job/" + id + "\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n";
}


export default Ember.ArrayController.extend({
  filters: [
    { name: "All",        state: null },
    { name: "Unassigned", state: 0    },
    { name: "Assigned",   state: 1    },
    { name: "Rejected",   state: 2    },
    { name: "Completed",  state: 3    },
  ],
  filter: null,        // state number to filter by

  filteredJobs: function() {
    var jobs = this.get('content'), filter = this.get('filter');

    return (filter === null) ? jobs : jobs.filterBy('state', filter);
  }.property('content.@each', 'content.@each.state', 'filter'),

  selectedDailyMember: null,

  selectedJobs:          Ember.computed.filterBy('content', 'selected'),
  isSelectedJobs:        Ember.computed.notEmpty('selectedJobs'),
  isNotSelectedJobs:     Ember.computed.not('isSelectedJobs'),
  isSelectedDailyMember: Ember.computed.notEmpty('selectedDailyMember'),
  isAssignable:          Ember.computed.and('isSelectedDailyMember', 'isSelectedJobs'),
  isNotAssignable:       Ember.computed.not('isAssignable'),

  actions: {
    changeState: function(state) {
      this.get('selectedJobs').slice().map(function(job) {
        job.set('selected', false); // uncheck box
        job.set('state', state);        // set to complete
        job.save();
      });
    },
    setupMailAssign: function() {
      var job = this.get('selectedJobs')[0].get('data'), 
      deadline = job.dueDate;

      var member = this.get('selectedDailyMember.data'),
          name = member.name;
      this.set('email', member.email);

      this.set('subject', generateSubjectAssign(job.coverageType, job.date, job.time));
      this.set('body', generateBodyAssign(job.title, name, job.coverageType, job.contact, 
            deadline, job.loc, job.time, job.date, job.details));
    },
    setupMailReject: function() {
      var job = this.get('selectedJobs')[0].get('data');
      this.set('email', job.email);
      this.set('subject', generateSubjectReject(job.coverageType));
      this.set('body', generateBodyReject(job.fullName, job.coverageType, 
            job.title, job.details, job.dueDate, job.createdAt, job.id));
    },
    mailJobAssign: function() {
      var controller = this,
          job = this.get('selectedJobs')[0],
          member = this.get('selectedDailyMember'),
          email = this.get('email'), 
          data = { 
            type:    'assign',
            email:   email,
            subject: this.get('subject'),
            id:     job.id
          };

      // establish associations
      var oldMember = job.get('dailyMember');
      if (oldMember !== null) { 
        oldMember.get('jobs').removeObject(job); // remove old member
      }
      job.set('dailyMember', member);            // assign new

      job.set('selected', false); // uncheck the check box
      job.set('state', 1); // assign it

      job.save().then(function(job) {
        member.get('jobs').pushObject(job);
        member.save().then(function() {
          // success -> mail
          Ember.$.ajax({
            type: "POST",
            url: 'api/mail_job',
            data: data,
            success: function() {
              controller.notify.success('Successfully sent email to ' + email + ' regarding job ' + job.get('title') + '.');
            },
            error: function() {
                     controller.notify.alert("Failed to send email to " + email + ' regarding job ' + job.get('title') + '.');
                   },
            dataType: 'json'
          });
        }, function() {
          controller.notify.alert("Failed to update member. Contact admin.");
        });
      }, function() {
        controller.notify.alert("Failed to update job. Contact admin.");
      });
    },
    mailJobReject: function () {
      var controller = this,
      job        = this.get('selectedJobs')[0], 
      email      = job.get('email'),
      reason     = this.get('reason'),
      data = {
        type:    'reject',
        email:   email,
        subject: this.get('subject'),
        id:      job.get('id')
      };

      // clear associations
      var member = job.get('dailyMember');
      // if assigned, remove job from dailyMember and dailyMember from job
      if (member !== null) { 
        member.get('jobs').removeObject(job);
        member.save();
        job.set('dailyMember', null);
      }

      // NEEDSWORK: This could be refactored but not worth the time
      // reason isn't set in form as form doesn't know which job is selected
      job.set('reason', reason);
      job.set('selected', false); // uncheck the check box
      job.set('state', 2); // reject it

      job.save().then(function() {
        Ember.$.ajax({
          type: "POST",
          url: '/api/mail_job',
          data: data,
          success: function() {
            controller.set('reason', null);
            controller.notify.success('Successfully sent email to ' + job.get('email') + ' regarding job ' + job.get('title') + '.');
          },
          error: function() {
            controller.notify.alert('Failed to send email to ' + email + ' regarding job ' + job.get('title') + '.');
          },
          dataType: 'json'
        });
      }, function() {
        controller.notify.alert("Failed to save " + job.title + ".");
      });
    }
  }
});
