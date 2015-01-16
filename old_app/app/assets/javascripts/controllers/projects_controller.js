App.ProjectsController = Em.ArrayController.extend({
  newProjectModalButtons: [
    Ember.Object.create({title: 'Create', clicked: 'createProject'}),
    Ember.Object.create({title: 'Cancel', clicked: 'cancel', dismiss: 'modal'})
  ],
  actions: {
    deleteProject: function(project) {
      project.destroyRecord();
    },
    showNewProject: function(project) {
      if (project) {
        this.set('editProject', project);
        this.set('title',     project.get('title'));
        this.set('author', project.get('author'));
        this.set('startDate',      project.get('startDate'));
        this.set('publishDate',  project.get('publishDate'));
        this.set('notes',    project.get('notes'));
      }
      return Bootstrap.ModalManager.show('newProject');
    },
    cancel: function() {
      this.set('title', '');
      this.set('author', '');
      this.set('startDate', '');
      this.set('publishDate', '');
      this.set('notes', '');
    },
    createProject: function() {
      newProject = this.get('editProject');
      this.set('errors', {}); // move validation into the controller
      if (validate(this, this.get('validations'))) {
        if (!newProject) { // if newProject is undefined
          newProject = this.store.createRecord('project', {
            title:       this.get('title'),
            author:      this.get('author'),
            startDate:   this.get('startDate'),
            publishDate: this.get('publishDate'),
            notes:       this.get('notes')
          });
        }
        // if defined, then editing an existing member so update all fields
        else { 
          newProject.set('title', this.get('title'));
          newProject.set('author', this.get('author'));
          newProject.set('startDate', this.get('startDate'));
          newProject.set('publishDate', this.get('publishDate'));
          newProject.set('notes', this.get('notes'));
        }

        var controller = this;
        newProject.save().then(function() {
          controller.send('cancel');
          return Bootstrap.NM.push('Succesfully added ' + controller.get('title') + '.', 'success');
        }, function() {
          return Bootstrap.NM.push('Failed to add ' + controller.get('title') + '.', 'danger');
        });

        return Bootstrap.ModalManager.close('newProject');
      }
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
