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
function validate(context, validations) {
  var isValid = true;
  for (field in validations) {
    // if field is blank and it passes the regex
    var data = context.get(field);
    if (data && data.match(validations[field].regex)) {
      context.set("errors." + field, null);
    }
    else { // it failed
      context.set("errors." + field, validations[field].message);
      isValid = false;
    }
  }
  return isValid;
};

function generateSubject(coverageType, deadline) {
  return "Tufts Daily Photo Assignment: " + coverageType + " due on " + deadline;
};

function generateBody(name, coverageType, contact, deadline, loc, time, details) {
  return "Dear " + name + ",\n\nThank you for working on this assignment. If you have any questions please call Nick at 603-686-3733 or reply to this email. Please deliver all images onto the Photoshelter server via FTP by the specified deadline with captions, keywords, and proper toning. Full sized JPGs will suffice.\n\nHave fun :)\n\nEvent Details:\n\nCoverage type: " + coverageType + "\n\n Contact information for the subject: " + contact + "\n Due on the Photoshelter server by: " + deadline + "\n\n Where: " + loc + "\n When: " + time + "\n\n Details: " + details + "\n\n Thank you,\n\n The Tufts Daily Photo Team\n\n -----------------"
};
