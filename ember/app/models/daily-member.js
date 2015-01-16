import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations.Mixin, {
  position: DS.attr('string'),
  name:     DS.attr('string'),
  email:    DS.attr('string'),
  phone:    DS.attr('string'),
  day:      DS.attr('string'),
  backDay:  DS.attr('string'),
  sports:   DS.attr('string'),
  notes:    DS.attr('string'),
  jobs:     DS.hasMany('job'),
       
  validations: {
    name: {
      length: { 
        message: "Enter a name (min of 3 characters, max of 20)",
        minimum: 3, 
        maximum: 20
      }
    },
    email: {
      format: {
        with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
        message: "Enter a valid email"
      }
    },
    phone: {
      format: {
        with: /\d\d\d \d\d\d \d\d\d\d/,
        message: "Follow the placeholder exactly!"
      }
    },
    position: { presence: { message: "Enter a position for this person" } }
  }
});
