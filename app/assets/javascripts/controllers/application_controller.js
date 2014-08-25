App.ApplicationController = Em.ObjectController.extend({
  signedIn: false,
  isJobs: false,
  username: null,
  password: null,
  credErrors: false,
  actions : {
    signIn: function() {
      var controller = this;
      return Ember.$.post('/users/sign_in.json', {
          user: {
            email: this.get('username'),
            password: this.get('password')
          }
        }, function(data) {
          controller.set('credErrors', false);
          location.reload();
        }, 'json').fail(function() {
          controller.set('credErrors', true);
      });
    },
    signOut: function() {
      Ember.$.ajax({
        url: '/users/sign_out',
        type: 'DELETE',
        success: function(result) {
          location.reload();
        }
      });
    }
  }
});
