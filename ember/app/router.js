import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('jobs');
  this.route('settings');
  this.route('projects');
  this.route('archive');
  this.route('stock');
  this.route('job_edit', { path: 'job/:job_id' });
  this.resource('mail_job');
  this.route("Index");
  this.route("Application");
  this.route("Projects");
  this.route("Jobs");
  this.route("Stock");
  this.route("Settings");
  this.route("Archive");
  this.route("JobEdit");
  this.route("MailJob");
});

export default Router;
