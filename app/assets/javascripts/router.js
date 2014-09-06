// For more information see: http://emberjs.com/guides/routing/

App.Router.map(function() {
  this.route('jobs');
  this.route('settings');
  this.route('projects');
  this.route('archive');
  this.route('job_edit', { path: 'job/:job_id' })
  this.resource('mail_job');
});
