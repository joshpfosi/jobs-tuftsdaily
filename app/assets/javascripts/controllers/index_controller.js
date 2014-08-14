App.IndexController = Em.ObjectController.extend({
  sections: ['Sports', 'Features', 'News'],
  actions: {
    save: function(model) {
      var that = this;
      if (validate(this, this.get('validations'))) {
        model.save().then(function() {
          console.log('successfully saved');
          that.set('model', that.store.createRecord('job'));
        });
      }
    }
  },
  validations: {
    fullName: {
      regex: /^[A-Za-z0-9 ]{3,20}$/, 
      message: "Enter your full name (min of 3 characters, max of 20)"
    },
    email: {
      regex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
      message: "Enter a valid email"
    },
    phone: {
      regex: /\d\d\d \d\d\d \d\d\d\d/,
      message: "Follow the placeholder exactly!"
    },
    title: {
      regex: /.*/,
      message: "Enter a title for the job"
    },
    contact: {
      regex: /.*/,
      message: "Enter contact information for your subject"
    },
    section: {
      regex: /.*/,
      message: "Choose a section from the list"
    },
    coverageType: {
      regex: /.*/,
      message: "Enter the kind of coverage"
    },
    dueDate: {
      regex: /\d\d\d\d-\d\d-\d\d/,
      message: "Enter a valid date"
    },
    dueTime: {
      regex: /\d\d:\d\d/,
      message: "Enter a valid time"
    },
    details: {
      regex: /.*/,
      message: "You must submit details"
    }
  }
});
