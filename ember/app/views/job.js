import Ember from 'ember';

var JobView = Ember.View.extend({
  templateName: 'job',
  color: function() {
    var state = this.get('context.state');
    return ['info', 'danger', 'success', 'warning', 'pending', 'archived'][state + 1];
  }.property('context.state'),
  id: function() { return "demo" + this.get('context.id'); }.property(),
  href: function() { return "#" + this.get('id'); }.property(),
  eventLoc: Ember.computed.alias('context.loc'),
  edit: function() { return "#/job/" + this.get('context.id'); }.property()
});

export default JobView;
