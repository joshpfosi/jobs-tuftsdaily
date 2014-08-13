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

