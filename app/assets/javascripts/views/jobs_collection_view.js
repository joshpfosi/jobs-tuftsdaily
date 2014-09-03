App.JobsCollection = Em.CollectionView.extend({
  tagName: 'tbody',
  content: Em.computed.alias('controller.content'),
  itemViewClass: App.JobView,
  emptyView: Ember.View.extend({
    template: Ember.Handlebars.compile("<tbody><tr><td colspan=12><em>You need some jobs!</em></td></tr></tbody>")
  })
});
