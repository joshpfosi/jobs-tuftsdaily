import Ember from 'ember';

Ember.Handlebars.helper('toDate', function(time) {
  return new Date(time).toDateString();
});

Ember.Handlebars.helper('cleanOnEmpty', function(data) {
  // if null, display a dash, otherwise just the data
  return (data) ? data : '-';
});
