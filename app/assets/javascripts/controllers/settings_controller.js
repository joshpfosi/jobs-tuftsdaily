App.SettingsController = Em.ArrayController.extend({
  newDailyMemberModalButtons: [
    Ember.Object.create({title: 'Create', clicked: 'createDailyMember'}),
    Ember.Object.create({title: 'Cancel', clicked: 'cancel', dismiss: 'modal'})
  ],
  actions: {
    deleteDailyMember: function(member) {
      // clear relationships
      member.get('jobs').forEach(function(job) {
        job.set('daily_member', null);
      });

      member.destroyRecord();
    },
    showNewDailyMember: function() {
      return Bootstrap.ModalManager.show('newDailyMember');
    },
    cancel: function() {
      this.set('name', '');
      this.set('email', '');
      this.set('phone', '');
      this.set('position', '');
    },
    createDailyMember: function() {
      this.set('errors', {}); // move validation into the controller
      if (validate(this, this.get('validations'))) {
        var newMember = this.store.createRecord('daily_member', {
          name: this.get('name'),
          position: this.get('position'),
          email: this.get('email'),
          phone: this.get('phone')
        });

        var controller = this;
        newMember.save().then(function() {
          controller.send('cancel');
          return Bootstrap.NM.push('Succesfully added ' + controller.get('name') + '.', 'success');
        }, function() {
          return Bootstrap.NM.push('Failed to add ' + controller.get('name') + '.', 'danger');
        });

        return Bootstrap.ModalManager.close('newDailyMember');
      }
    },
  },
  validations: {
    name: {
      regex: /^[A-Za-z0-9 ]{3,20}$/, 
      message: "Enter a name (min of 3 characters, max of 20)"
    },
    email: {
      regex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
      message: "Enter a valid email"
    },
    phone: {
      regex: /\d\d\d \d\d\d \d\d\d\d/,
      message: "Follow the placeholder exactly!"
    },
    position: {
      regex: /.*/,
      message: "Enter a position for this person"
    },
  }
});
