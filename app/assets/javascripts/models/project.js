App.Project = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  startDate: DS.attr('string'),
  publishDate: DS.attr('string'),
  notes: DS.attr('string'),
});
