import Ember from 'ember';
import startApp from 'jobs-tuftsdaily/tests/helpers/start-app';

var App;

module('Integration - Landing Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should load content', function() {
  visit('/').then(function() {
    //ok(exists("*"), "Found HTML!");
    ok(!!find("*").length, "Found HTML!");
  });
});
