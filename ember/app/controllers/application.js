import Ember from 'ember';

export default Ember.ObjectController.extend({
  signedIn: false,
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
        }, function() {
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
        success: function() {
          location.reload();
        }
      });
    }
  }
});
