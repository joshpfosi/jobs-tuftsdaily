import Ember from 'ember';
import JobView from './job';

export default Ember.CollectionView.extend({
  tagName: 'tbody',
  content: function() {
    return this.get('controller.filteredJobs');
  }.property('controller.filteredJobs'),//Ember.computed.alias('controller.filteredJobs'),
  itemViewClass: JobView,
  emptyView: Ember.View.extend({
    templateName: 'jobs-collection-empty'
  })
});
