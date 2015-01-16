import Ember from 'ember';

export default Ember.Component.extend({
  dataParent: function() {
    return "#" + this.get('parentId');
  }.property('parentId'),
  href: function() {
    return "#" + this.get('collapseId');
  }.property('collapseId'),
  headingId: function() {
    return this.get('collapseId') + 'Heading';
  }.property('collapseId'),
});
