import Ember from 'ember';

export default Ember.Handlebars.makeBoundHelper(function(data) {
  // if null, display a dash, otherwise just the data
  return (data) ? data : '-';
});
