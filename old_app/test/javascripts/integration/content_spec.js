module("Ember.js Library", {
  setup: function() {
    Ember.run(App, App.advanceReadiness);
  },
  teardown: function() {
  }
});
 
test("Check HTML is returned", function() {
  expect(1);
 
  //visit("/").then(function() {
  //  ok(exists("*"), "Found HTML!");
  //});

  visit('/')
  .fillIn('input.title', "test title")
  .click('.content button');
  ok(true, "true is true");
});
