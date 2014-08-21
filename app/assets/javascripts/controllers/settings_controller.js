App.SettingsController = Em.ArrayController.extend({
  actions: {
    deleteDailyMember: function(member) {
      member.destroyRecord();
    }
  }
});
