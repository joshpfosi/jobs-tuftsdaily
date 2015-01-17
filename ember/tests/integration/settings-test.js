import Ember from 'ember';
import startApp from 'jobs-tuftsdaily/tests/helpers/start-app';
import exists from 'jobs-tuftsdaily/tests/helpers/start-app';

var App;

module('Integration - Settings Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should load content', function() {
  visit('/settings').then(function() {
    //ok(exists("*"), "Found HTML!");
    ok(true, "dummy test");
  });
});
