Ember.Handlebars.helper('toDate', function(time) {
  return new Date(time).toDateString();
});
