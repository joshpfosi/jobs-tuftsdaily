import Ember from 'ember';

function generateSubjectAssign(coverageType, deadline) {
  return "Tufts Daily Photo Assignment: " + coverageType + " due on " + deadline;
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
  isNotSelectedJobs:     Ember.computed.not('isSelectedJobs'),
  isSelectedDailyMember: Ember.computed.notEmpty('selectedDailyMember'),
  isAssignable:          Ember.computed.and('isSelectedDailyMember', 'isSelectedJobs'),
  isNotAssignable:       Ember.computed.not('isAssignable'),
  archivable:            Ember.computed.filter('content', function(job) {
    return moment(new Date(job.get('publishDate'))).diff(moment(new Date())) < 0;
  }),
  hasArchivables:        Ember.computed.notEmpty('archivable'),

  actions: {
    archive: function() {
      var controller = this;
      return Ember.$.ajax({
        type: "POST",
        url: '/api/jobs/archive',
        success: function() { location.reload(); },
        error: function() { controller.notify.alert("Failed to archive jobs. Notifier the administrator."); },
        dataType: 'json'
      });
    },
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

      this.set('subject', generateSubjectAssign(job.coverageType, deadline));
      this.set('body', generateBodyAssign(job.title, name, job.coverageType, job.contact, 
            deadline, job.loc, job.time, job.date, job.details));
    },
    setupMailReject: function() {
      var job = this.get('selectedJobs')[0].get('data'), 
      deadline = job.dueDate;
      this.set('email', job.email);
      this.set('subject', generateSubjectReject(job.coverageType));
      this.set('body', generateBodyReject(job.fullName, job.coverageType, 
            job.title, job.details, deadline, job.createdAt, job.id));
    },
    mailJobAssign: function() {
      var controller = this,
          job = this.get('selectedJobs')[0],
          member = this.get('selectedDailyMember'),
          email = this.get('email'), 
          deadline = job.get('dueDate'),
          data = { 
            title:        job.get('title'),
            email:        email,
            subject:      this.get('subject'),
            name:         member.get('name'),
            coverageType: job.get('coverageType'),
            contact:      job.get('contact'),
            deadline:     deadline,
            loc:          job.get('loc'),
            time:         job.get('time'),
            date:         job.get('date'),
            details:      job.get('details')
          };

      Ember.$.ajax({
        type: "POST",
        url: 'api/mail_job?type=assign',
        data: data,
        success: function() {
          job.set('selected', false); // uncheck the check box
          job.set('state', 1); // assign it

          // establish associations
          var currentMem = job.get('daily_member'); // unassign old member
          if (currentMem !== undefined) {
            currentMem.get('jobs').removeObject(job); 
          }
          job.set('daily_member', member);                // assign new one
          job.save();

          member.get('jobs').pushObject(job);
          member.save();

          controller.notify.success('Successfully sent email to ' + email + ' regarding job ' + job.get('title') + '.');
        },
        error: function() {
          controller.notify.alert("Failed to ");
          //send email to ' + email + ' regarding job ' + job.get('title') + '.');
        },
        dataType: 'json'
      });
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
        url: '/api/mail_job?type=reject',
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
          controller.notify.alert('Failed to send email to ' + email + ' regarding job ' + job.get('title') + '.');
        },
        dataType: 'json'
      });
    }
  },
});
