App.SettingsController = Em.ArrayController.extend({
  newDailyMemberModalButtons: [
    Ember.Object.create({title: 'Create', clicked: 'createDailyMember'}),
    Ember.Object.create({title: 'Cancel', clicked: 'cancel', dismiss: 'modal'})
  ],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  actions: {
    deleteDailyMember: function(member) {
      // clear relationships
      member.get('jobs').forEach(function(job) {
        job.set('daily_member', null);
      });

      member.destroyRecord();
    },
    showNewDailyMember: function(member) {
      if (member) {
        this.set('editMember', member);
        this.set('name',     member.get('name'));
        this.set('email',    member.get('email'));
        this.set('phone',    member.get('phone'));
        this.set('position', member.get('position'));
        this.set('day',      member.get('day'));
        this.set('backDay',  member.get('backDay'));
        this.set('notes',    member.get('notes'));
      }
      return Bootstrap.ModalManager.show('newDailyMember');
    },
    cancel: function() {
      this.set('name', '');
      this.set('email', '');
      this.set('phone', '');
      this.set('position', '');
      this.set('day', '');
      this.set('backDay', '');
      this.set('notes', '');
    },
    createDailyMember: function() {
      newMember = this.get('editMember');
      this.set('errors', {}); // move validation into the controller
      if (validate(this, this.get('validations'))) {
        if (!newMember) { // if newMember is undefined
          newMember = this.store.createRecord('daily_member', {
            name:     this.get('name'),
            position: this.get('position'),
            email:    this.get('email'),
            phone:    this.get('phone'),
            day:      this.get('day'),
            backDay:  this.get('backDay'),
            notes:    this.get('notes')
          });
        }
        // if defined, then editing an existing member so update all fields
        else { 
          newMember.set('name', this.get('name'));
          newMember.set('position', this.get('position'));
          newMember.set('email', this.get('email'));
          newMember.set('phone', this.get('phone'));
          newMember.set('day', this.get('day'));
          newMember.set('backDay', this.get('backDay'));
          newMember.set('notes', this.get('notes'));
        }

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
    }
  }
});
