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
    deleteBlankProject: function() {
      var editProject = this.get('editProject');

      // if id === null then its not a saved project so delete
      if (editProject.get('id') === null) {
        editProject.deleteRecord();
      }
      // done editing, so set up for new project
      this.set('editProject', null);
    },
    createProject: function() {
      var controller = this;
      this.get('editProject').save().then(function(project) {
        controller.notify.success('Succesfully added ' + project.get('title') + '.');
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
