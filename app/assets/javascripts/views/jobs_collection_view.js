App.JobsCollection = Em.CollectionView.extend({
  tagName: 'tbody',
  content: Em.computed.alias('controller.filteredJobs'),
  itemViewClass: App.JobView,
})
