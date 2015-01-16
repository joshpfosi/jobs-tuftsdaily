import Ember from 'ember';
import JobView from './job';

export default Ember.CollectionView.extend({
  tagName: 'tbody',
  content: function() {
    return this.get('controller.filteredJobs');
  }.property('controller.filteredJobs'),//Ember.computed.alias('controller.filteredJobs'),
  itemViewClass: JobView,
  emptyView: Ember.View.extend({
    template: Ember.Handlebars.compile("<tbody><tr><td colspan=12><em>You need some jobs!</em></td></tr></tbody>")
  })
});
