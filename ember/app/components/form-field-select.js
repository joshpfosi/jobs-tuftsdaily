import Ember from 'ember';

export default Ember.Component.extend({
  labelPath: function() {
    var optionLabelPath = this.get('optionLabelPath');
    return (optionLabelPath === undefined) ? 'content' : optionLabelPath;
  }.property('optionLabelPath'),
  valuePath: function() {
    var optionValuePath = this.get('optionValuePath');
    return (optionValuePath === undefined) ? 'content' : optionValuePath;
  }.property('optionValuePath')
});
