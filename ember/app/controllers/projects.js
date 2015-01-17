import Ember from 'ember';

export default Ember.ArrayController.extend({
  editProject: null,
  hasEditProjectObs: function() {
    this.set('hasEditProject', this.get('editProject') !== null);
  }.observes('editProject'),
  hasEditProject: false,
  success:  false,
  //newProjectModalButtons: [
  //  Ember.Object.create({title: 'Create', clicked: 'createProject'}),
  //  Ember.Object.create({title: 'Cancel', clicked: 'cancel', dismiss: 'modal'})
  //],
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
    //setupEditProject: function(project) {
    //  if (project) {
    //    this.set('editProject', project);
    //    this.set('title',     project.get('title'));
    //    this.set('author', project.get('author'));
    //    this.set('startDate',      project.get('startDate'));
    //    this.set('publishDate',  project.get('publishDate'));
    //    this.set('notes',    project.get('notes'));
    //  }
    //  return Bootstrap.ModalManager.show('newProject');
    //},
    //cancel: function() {
    //  this.set('title', '');
    //  this.set('author', '');
    //  this.set('startDate', '');
    //  this.set('publishDate', '');
    //  this.set('notes', '');
    //},
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
