import Ember from 'ember';
import DS from 'ember-data';

export default DS.ActiveModelAdapter.extend({
  namespace: 'api',
  headers: Ember.computed(function(){
    var token = Ember.$('meta[name="csrf-token"]').attr('content');

    return {"X-CSRF-Token": token};
  })
});
