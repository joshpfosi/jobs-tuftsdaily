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
