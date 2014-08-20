// given a column and an array of jobs, returns the array sorted by the property
// given by column
function sortColumns(column, array) {
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
    case 'dueTime':
      return array.sort(function(a, b) { 
        return parseInt(a.get('dueTime').replace(':', ''))
               - parseInt(b.get('dueTime').replace(':', '')); });
    default:
      return array.sortBy(column);
  };
};

// given a controller and a set of validations with a regex to validate against,
// validates that the controller's field adheres to the regex, setting context.errors
// if not
function validate(controller, validations) {
  var isValid = true;
  for (field in validations) {
    // if field is blank and it passes the regex
    var data = controller.get(field);
    if (data && data.match(validations[field].regex)) {
      controller.set("errors." + field, null);
    }
    else { // it failed
      controller.set("errors." + field, validations[field].message);
      isValid = false;
    }
  }
  return isValid;
};

function generateSubjectAssign(coverageType, deadline) {
  return "Tufts Daily Photo Assignment: " + coverageType + " due on " + deadline;
};

function generateBodyAssign(name, coverageType, contact, deadline, loc, time, details) {
  return "Dear " + name + ",\n\nThank you for working on this assignment. If you have any questions please call Nick at 603-686-3733 or reply to this email. Please deliver all images onto the Photoshelter server via FTP by the specified deadline with captions, keywords, and proper toning. Full sized JPGs will suffice.\n\nHave fun :)\n\nEvent Details:\n\nCoverage type: " + coverageType + "\n\n Contact information for the subject: " + contact + "\n Due on the Photoshelter server by: " + deadline + "\n\n Where: " + loc + "\n When: " + time + "\n\n Details: " + details + "\n\nThank you,\n\n The Tufts Daily Photo Team\n\n -----------------"
};

function generateSubjectReject(coverageType) {
  return "Your request for " + coverageType + " has been rejected";
};

function generateBodyReject(name, coverageType, details, deadline, timestamp) {
  return "Dear " + name + ",\n\nYou have submitted a request:\n\n" + coverageType + "\nDescription: " + details + "\nDeadline: " + deadline + "\n\nSubmitted on: " + timestamp + "\n\nThank you for taking the time to do this. Unfortunately, we are unable to cover your request.\n\nWe feel that [reason for rejection].\n\nPlease reply with any modification or additional ideas you may have.\n\nThank you,\n\nThe Tufts Daily Photo Team";
};
