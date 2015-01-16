import Ember from 'ember';

export default Ember.Handlebars.helper('toDate', function(time) {
  return new Date(time).toDateString();
});
