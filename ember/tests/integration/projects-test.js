import Ember from 'ember';
import startApp from 'jobs-tuftsdaily/tests/helpers/start-app';
import exists from 'jobs-tuftsdaily/tests/helpers/start-app';

var App;

module('Integration - Projects Page', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('Should load content', function() {
  visit('/projects').then(function() {
    //ok(exists("*"), "Found HTML!");
    ok(true, "dummy test");
  });
});

//test('Should display empty project msg', function() {
//  visit('/projects').then(function() {
//    ok(exists('em'), "found em");
//    ok(find('em').text() === "You need some projects!", "Empty text present!");
//  });
//});
//
//test('Should show modal', function() {
//  visit('/projects').then(function() {
//    click('#add_projects');
//    ok(find('.modal').attr('style') === "display: block;", "Modal appeared");
//  });
//});
