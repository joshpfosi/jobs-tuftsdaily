App.SettingsController = Em.ArrayController.extend({
  newDailyMemberModalButtons: [
    Ember.Object.create({title: 'Create', clicked: 'createDailyMember'}),
    Ember.Object.create({title: 'Cancel', clicked: 'closeDailyMemberModal', dismiss: 'modal'})
  ],
  actions: {
    deleteDailyMember: function(member) {
      member.destroyRecord();
    },
    showNewDailyMember: function() {
      return Bootstrap.ModalManager.show('newDailyMember');
    },
    closeDailyMemberModal: function() {
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

        var that = this;
        newMember.save().then(function() {
          Bootstrap.NM.push('Succesfully added ' + that.get('name') + '.', 'success');
          that.set('name', '');
          that.set('email', '');
          that.set('phone', '');
          that.set('position', '');
        }, function() {
          return Bootstrap.NM.push('Failed to add ' + that.get('name') + '.', 'danger');
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
