import Ember from 'ember';

export default Ember.ArrayController.extend({
  editMember: null,
  hasEditMemberObs: function() {
    this.set('hasEditMember', this.get('editMember') !== null);
  }.observes('editMember'),
  hasEditMember: false,
  success:  false,
  mailMembers: [
    Ember.Object.create({title: 'Send Mail', clicked: 'sendMailToMembers'}),
    Ember.Object.create({title: 'Cancel', clicked: 'cancel', dismiss: 'modal'})
  ],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  sportsAnswers: ['Yes', 'No'],
  positions: ['Executive Photo Editor', 'Photo Administrator', 'Picture Tufts Editor', 'Picture Tufts Contributor', 'Stock Image Editor', 'Section Liaison', 'Staff Photographer', 'Project Photographer', 'Trainee', 'Inactive'],

  selectedMembers: Ember.computed.filterBy('content', 'selected'),
  isSelectedMembers: Ember.computed.empty('selectedMembers'),
  
  selectedAll: false,
  selectAll: function() {
    var selected = this.get('selectedAll');
    this.get('content').forEach(function(member) {
      member.set('selected', selected);
    });
  }.observes('selectedAll'),

  actions: {
    deleteDailyMember: function(member) {
      // clear relationships
      member.get('jobs').forEach(function(job) {
        job.set('daily_member', null); job.save();
      });

      member.destroyRecord();
    },
    showNewDailyMember: function() {
      this.set('editMember', this.store.createRecord('daily_member'));
    },
    editOldDailyMember: function(member) {
      this.set('editMember', member);
    },
    createDailyMember: function() {
      var controller = this;
      return this.get('editMember').save().then(function(member) {
        controller.notify.success('Succesfully added ' + member.get('name') + '.');
        controller.set('editMember', null);
        controller.set('hasEditMember', false);
        controller.set('success', true);
      }, function() {
        controller.notify.alert('Failed to save daily member.');
        controller.set('hasEditMember', true);
      });
    },
    showMailMembersModal: function() {
      var members = this.get('selectedMembers');
      this.set('email', members.mapBy('email'));

      //@property {string} The name of the modal, required later to close the modal
      //@property {string} The title of the modal.
      //@property {string} The template name to render within the modal body, a View class may also be specified.
      //@property {array} Array of Button meta data
      //@property {object} The controller instance that instantiate the modal.
      Bootstrap.ModalManager.open('mailMembersModal', 'Send Mail', 
          'mail_members', this.mailMembers, this);
    },
    sendMailToMembers: function() {
      var controller = this, members = this.get('selectedMembers'),
          email = this.get('email'),
          data = {
            email:   email,
            subject: this.get('subject'),
            body:    this.get('body')
          };
      Ember.$.ajax({
        type: "POST",
        url: 'api/mail_job?type=members',
        data: data,
        success: function() {
          controller.send('closeMailMembersModal'); // clear the input fields
          members.slice().forEach(function(member) {
            member.set('selected', false); // uncheck the check boxes
          });

          controller.notify.success('Successfully sent email to ' + email + '.');
        },
        error: function() {
          controller.notify.alert('Failed to send email to ' + email + '.');
        },
        dataType: 'json'
      });
      Bootstrap.ModalManager.close('mailMembersModal');
    },
    closeMailMembersModal: function() {
      this.set('subject', '');
      this.set('body', '');
    }
  },
});
