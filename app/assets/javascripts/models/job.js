App.Job = DS.Model.extend({
  timestamp: DS.attr('number'),
  title: DS.attr('string'),
  fullName: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  contact: DS.attr('string'),
  section: DS.attr('string'),
  coverageType: DS.attr('string'),
  publishDate: DS.attr('string'),
  dueDate: DS.attr('string'),
  details: DS.attr('string'),
  state: DS.attr('number'),
  loc: DS.attr('string'),
  date: DS.attr('string'),
  time: DS.attr('string'),
  daily_member: DS.belongsTo('daily_member')
});

// NOTE state: 0 => unassigned, 1 => assigned, 2 => rejected 3 => completed, 4 => investigated, 5 => pending, 6 => archived
