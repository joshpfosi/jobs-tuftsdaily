import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('jobs');
  this.route('settings');
  this.route('archive');
  this.route('job_edit', { path: 'job/:job_id' });
  this.resource('mail_job');
});

export default Router;
