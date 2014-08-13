App.JobView = Em.View.extend({
  templateName: 'job',
  color: function() {
    var state = this.get('context.state');
    if (state === 1) // assigned
      return 'info';
    if (state === 3) // completed
      return 'success';
    if (state === 2) // rejected
      return 'danger';
  }.property('context.state'),
  id: function() { return "demo" + this.get('context.id'); }.property(),
  href: function() { return "#" + this.get('id'); }.property(),
  eventLoc: Em.computed.alias('context.loc'),
  eventTime: Em.computed.alias('context.time'),
  eventDate: Em.computed.alias('context.date')
});
