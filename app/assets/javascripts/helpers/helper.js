// given a column and an array of jobs, returns the array sorted by the property
// given by column
function sortColumns(column, array) {
  if (!array) throw "Cannot call sortColumns() with null array";
  switch (column) {
    case 'id':
      return array.sort(function(a, b) {
        return parseInt(a.get('id')) - parseInt(b.get('id'));
      });
    case 'dueDate':
      return array.sort(function(a, b) { // covert date to integers
        return new Date(a.get('dueDate')).getTime()
               - new Date(b.get('dueDate')).getTime();
      });
    default:
      return array.sortBy(column);
  };
};

function generateSubjectAssign(coverageType, deadline) {
  return "Tufts Daily Photo Assignment: " + coverageType + " due on " + deadline;
};

function generateBodyAssign(title, name, coverageType, contact, deadline, loc, time, date, details) {
  return "Dear " + name + ",\n\nPlease cover the following assignment and let me know if you are unable to.\n\nSlug: " + title + "\n\nEvent Details:\n\nCoverage type: <%= @coverage_type %>\nContact information for the subject: " + contact + "\nDue on the Photoshelter server by: " + deadline + "\n\nWhere: " + location + "\nWhen: " + date + " " + time + "\n\nDetails: " + details + "\nThank you for working on this assignment. If you have any questions please call Nick at 603-686-3733 or reply to this email. Please deliver all images onto the Photoshelter server via FTP by the specified deadline with captions, keywords, and proper toning. Full sized JPGs will suffice.\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n"
};

function generateSubjectReject(coverageType) {
  return "Your request for " + coverageType + " needs more detail";
};

function generateBodyReject(name, coverageType, title, details, deadline, timestamp, id) {
  return "Dear " + name + ",\n\nYou have submitted a request:\n\nTitle: " + title + "\nCoverage Type: " + coverageType + "\nDescription: " + details + "\nDeadline: " + deadline + "\nSubmitted on: " + timestamp + "\n\nThank you for taking the time to do this. Unfortunately we are unable to cover your request.\n\n[Reason for rejection]\n\nPlease reply with any modification or additional ideas you may have, or edit the job request directly at:\n\n http://jobs-tuftsdaily.herokuapp.com/#/job/" + id + "\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n"
};

function mailJobReject() {
  var controller = this,
      job = this.get('selectedJobs')[0], 
      deadline = job.get('dueDate'),
      data = {
        email:        job.get('email'),
        subject:      this.get('subject'),
        name:         job.get('fullName'),
        coverage_type: job.get('coverageType'),
        title:        job.get('title'),
        deadline:     deadline,
        timestamp:    new Date(job.get('timestamp')),
        details:      job.get('details'),
        reason:       this.get('reason'),
        id:           job.get('id')
      };

  $.ajax({
    type: "POST",
    url: '/mail_job?type=reject',
    data: data,
    success: function(response) {
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

      return Bootstrap.NM.push('Successfully sent email to ' + job.get('email') + ' regarding job ' + job.get('title') + '.', 'success');
    },
    error: function(response) {
      return Bootstrap.NM.push('Failed to send email to ' + email + ' regarding job ' + job.get('title') + '.', 'danger');
    },
    dataType: 'json'
  });
  return Bootstrap.ModalManager.close('mailModal');
};

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
