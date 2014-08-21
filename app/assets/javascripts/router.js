// For more information see: http://emberjs.com/guides/routing/

App.Router.map(function() {
  this.route('jobs');
  this.route('settings');
  this.resource('mail_job');
});
