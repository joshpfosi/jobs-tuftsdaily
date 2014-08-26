App.MemberController = Ember.ObjectController.extend({
  idTag: function() { return "member" + this.get('id'); }.property(),
  href: function() { return "#" + this.get('idTag'); }.property(),
});
