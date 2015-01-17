import Ember from 'ember';

// given a column and an array of jobs, returns the array sorted by the property
// given by column
function sortColumns(column, array) {
  if (!array) {
    throw "Cannot call sortColumns() with null array";
  }

  switch (column) {
    case 'id':
      return array.sort(function(a, b) {
        return parseInt(a.get('id')) - parseInt(b.get('id'));
      });
    case 'dueDate':
      return array.sort(function(a, b) { // covert date to integers
        return new Date(a.get('dueDate')).getTime() - 
        new Date(b.get('dueDate')).getTime();
      });
    default:
      return array.sortBy(column);
  }
}

function generateSubjectAssign(coverageType, deadline) {
  return "Tufts Daily Photo Assignment: " + coverageType + " due on " + deadline;
}

function generateBodyAssign(title, name, coverageType, contact, deadline, loc, time, date, details) {
  return "Dear " + name + ",\n\nPlease cover the following assignment and let me know if you are unable to.\n\nSlug: " + title + "\n\nEvent Details:\n\nCoverage type: <%= @coverage_type %>\nContact information for the subject: " + contact + "\nDue on the Photoshelter server by: " + deadline + "\n\nWhere: " + location + "\nWhen: " + date + " " + time + "\n\nDetails: " + details + "\nThank you for working on this assignment. If you have any questions please call Nick at 603-686-3733 or reply to this email. Please deliver all images onto the Photoshelter server via FTP by the specified deadline with captions, keywords, and proper toning. Full sized JPGs will suffice.\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n";
}

function generateSubjectReject(coverageType) {
  return "Your request for " + coverageType + " needs more detail";
}

function generateBodyReject(name, coverageType, title, details, deadline, timestamp, id) {
  return "Dear " + name + ",\n\nYou have submitted a request:\n\nTitle: " + title + "\nCoverage Type: " + coverageType + "\nDescription: " + details + "\nDeadline: " + deadline + "\nSubmitted on: " + timestamp + "\n\nThank you for taking the time to do this. Unfortunately we are unable to cover your request.\n\n[Reason for rejection]\n\nPlease reply with any modification or additional ideas you may have, or edit the job request directly at:\n\n http://jobs-tuftsdaily.herokuapp.com/#/job/" + id + "\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n";
}

export default Ember.ArrayController.extend({
  //mailJobAssign: [
  //    Ember.Object.create({title: 'Submit', clicked: "mailJobAssign"}),
  //    Ember.Object.create({title: 'Cancel', clicked: 'closeMailModal', dismiss: 'modal'})
  //],
  //mailJobReject: [
  //    Ember.Object.create({title: 'Submit', clicked: "mailJobReject"}),
  //    Ember.Object.create({title: 'Cancel', clicked: 'closeMailModal', dismiss: 'modal'})
  //],
  columns: [
     Ember.Object.create({value: '',             name: ''          }), 
     Ember.Object.create({value: 'id',           name: '#'         }),
     Ember.Object.create({value: 'title',        name: 'Title'     }),
     Ember.Object.create({value: 'fullName',     name: 'Full Name' }),
     Ember.Object.create({value: 'email',        name: 'Email'     }),
     Ember.Object.create({value: 'phone',        name: 'Phone'     }),
     Ember.Object.create({value: 'section',      name: 'Section'   }),
     Ember.Object.create({value: 'coverageType', name: 'Coverage'  }),
     Ember.Object.create({value: 'publishDate',  name: 'Publish Date'  }),
     Ember.Object.create({value: 'dueDate',      name: 'Due Date'  }),
  ],
  filters: [
    { name: "All",        state: null },
    { name: "Unassigned", state: 0    },
    { name: "Assigned",   state: 1    },
    { name: "Rejected",   state: 2    },
    { name: "Completed",  state: 3    },
  ],
  filter: null,        // state number to filter by
  sortProperty: 'publishDate',
  sortDirection: true, // ascending by default

  filteredJobs: function() {
    var jobs = this.get('content'), filter = this.get('filter'),
        sortProperty = this.get('sortProperty'), sortDirection = this.get('sortDirection');
    // if filter selected, apply filterBy, otherwise don't
    jobs = (filter !== null) ? sortColumns(sortProperty, jobs.filterBy('state', filter)) : sortColumns(sortProperty, jobs.get('content'));
    
    // if descending, reverse array
    return (sortDirection) ? jobs : jobs.reverse();
  }.property('content', 'content.@each.state', 'filter', 'sortProperty', 'sortDirection'),

  selectedJobs: Ember.computed.filterBy('content', 'selected'),
  selectedDailyMember: null,
  isSelectedJobs: Ember.computed.notEmpty('selectedJobs'),
  isNotSelectedJobs: Ember.computed.not('isSelectedJobs'),
  isSelectedDailyMember: Ember.computed.notEmpty('selectedDailyMember'),
  isAssignable: Ember.computed.and('isSelectedDailyMember', 'isSelectedJobs'),
  isNotAssignable: Ember.computed.not('isAssignable'),

  actions: {
    deleteJob: function(job) {
      job.destroyRecord();
    },
    toggleSort: function(column) {
      if (this.get('sortProperty') === column) {
        this.toggleProperty('sortDirection');
      } else {
        this.set('sortProperty', column);
        this.set('sortDirection', true);
      }
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
          controller.notify.alert('Failed to send email to ' + email + ' regarding job ' + job.get('title') + '.');
        },
        dataType: 'json'
      });
    },
    mailJobReject: function() {
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
