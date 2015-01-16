App.CollapseController = Em.ObjectController.extend({
  idTag: function() { return "member" + this.get('id'); }.property(),
  href: function() { return "#" + this.get('idTag'); }.property(),
});
