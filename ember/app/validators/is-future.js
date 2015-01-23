import Ember from 'ember';
import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function() {
    var prop = this.model.get(this.property);
    var date = new Date(prop), today = new Date();
    
    var inPast = moment(new Date(date)).diff(moment(today)) < 0;

    if (Ember.isBlank(prop) || inPast) {
      this.errors.pushObject("date cannot be blank or in the past");
    }
  }
});
