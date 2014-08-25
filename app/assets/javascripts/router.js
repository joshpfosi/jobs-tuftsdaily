// For more information see: http://emberjs.com/guides/routing/

App.Router.map(function() {
  this.route('jobs');
  this.route('job_edit', { path: 'job/:job_id' })
  this.route('settings');
  this.resource('mail_job');
});
