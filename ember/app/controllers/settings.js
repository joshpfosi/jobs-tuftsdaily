import Ember from 'ember';

export default Ember.ArrayController.extend({
  email: null,
  editMember: null,
  hasEditMemberObs: function() {
    this.set('hasEditMember', this.get('editMember') !== null);
  }.observes('editMember'),
  hasEditMember: false,
  success:  false,

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
        job.set('dailyMember', null); job.save();
      });

      member.destroyRecord();
    },
    showNewDailyMember: function() {
      this.set('editMember', this.store.createRecord('dailyMember'));
    },
    editOldDailyMember: function(member) {
      this.set('editMember', member);
    },
    deleteBlankMember: function() {
      var editMember = this.get('editMember');

      // if id === null then its not a save member so delete
      if (editMember.get('id') === null) {
        editMember.deleteRecord();
      }
      // done editing, so set up for new member
      this.set('editMember', null);
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
    setEmails: function() {
      var members = this.get('selectedMembers');
      this.set('email', members.mapBy('email'));
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
    },
  },
});
