App.DailyMember = DS.Model.extend({
  position: DS.attr('string'),
  name:     DS.attr('string'),
  email:    DS.attr('string'),
  phone:    DS.attr('string'),
  jobs:     DS.hasMany('job'),
  day:      DS.attr('string'),
  backDay:  DS.attr('string'),
  notes:    DS.attr('string')
});
