import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations.Mixin, {
  createdAt: DS.attr('utc', { defaultValue: new Date() }),
  title: DS.attr('string'),
  fullName: DS.attr('string'),
  email: DS.attr('string'),
  phone: DS.attr('string'),
  contact: DS.attr('string'),
  section: DS.attr('string'),
  coverageType: DS.attr('string'),
  publishDate: DS.attr('utc'),
  dueDate: DS.attr('utc'),
  details: DS.attr('string'),
  state: DS.attr('number', { defaultValue: 0 }),
  loc: DS.attr('string'),
  date: DS.attr('string'),
  time: DS.attr('string'),
  dailyMember: DS.belongsTo('daily-member', { async: true }),

  validations: {
    email: {
      format: { 
        with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, 
        message: "Enter a valid email"
      }
    },
    title:        { presence: { message: "Enter a title for the job" } },
    section:      { presence: { message: "Choose a section from the list" } },
    coverageType: { presence: { message: "Enter the kind of coverage" } },
    publishDate:  { isFuture: true },
    dueDate:      { isFuture: true },
    details:      { presence: { message: "You must submit details" } }
  },
// NOTE state: 0 => unassigned, 1 => assigned, 2 => rejected 3 => completed, 4 => investigated, 5 => pending, 6 => archived, 7 => graphics
  
  color: function() {
    var state = this.get('state');
    return ['default', 'info', 'danger', 'success', 'warning', 'pending', 'archived', 'graphics'][state];
  }.property('state'),
  edit: function() { return "#/job/" + this.get('id'); }.property()
});
