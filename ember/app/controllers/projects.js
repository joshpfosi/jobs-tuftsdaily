import Ember from 'ember';

export default Ember.ArrayController.extend({
  editProject: null,
  hasEditProjectObs: function() {
    this.set('hasEditProject', this.get('editProject') !== null);
  }.observes('editProject'),
  hasEditProject: false,
  success:  false,
  actions: {
    deleteProject: function(project) {
      project.destroyRecord();
    },
    editOldProject: function(project) {
      this.set('editProject', project);
    },
    showNewProject: function() {
      this.set('editProject', this.store.createRecord('project'));
    },
    createProject: function() {
      var controller = this;
      this.get('editProject').save().then(function() {
        controller.notify.success('Succesfully added ' + controller.get('title') + '.');
        controller.set('editProject', null);
        controller.set('hasEditProject', false);
        controller.set('success', true);
      }, function() {
        controller.notify.alert('Failed to add ' + controller.get('title') + '.');
        controller.set('hasEditProject', true);
      });
    },
  },
  validations: {
    title: {
      regex: /^[A-Za-z0-9 ]{3,20}$/, 
      message: "Enter a title (min of 3 characters, max of 20)"
    },
    author: {
      regex: /.*/,
      message: "Enter an author for this project"
    },
    startDate: {
      regex: /\d\d\d\d-\d\d-\d\d/,
      message: "Enter a valid date"
    }
  }
});
