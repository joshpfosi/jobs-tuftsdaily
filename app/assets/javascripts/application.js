// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap.min
//= require handlebars
//= require ember
//= require ember-data
//= require spin.min
//= require moment
//= require ember-validations
//= require_self
//= require ./app

// for more details see: http://emberjs.com/guides/application/
App = Ember.Application.create();

// TODO move elsewhere, but cannot figure out why it isn't loaded
App.UtcTransform = DS.Transform.extend({  
  serialize: function(value) {
    return value ? moment.utc(new Date(value)).format() : null;
  },
  deserialize: function(value) {
    return value ? moment.utc(value).format("YYYY-MM-DD") : null;
  }
});
//= require_tree .
