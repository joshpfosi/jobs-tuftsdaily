App.IndexController = Em.ObjectController.extend({
  sections: ['News', 'Features', 'Sports', 'Arts', 'Multimedia', 'Op-Ed'],
  coverageTypes: ['Portrait/Headshot', 'Event', 'Lecture', 'Feature Story', 'File Photo', 'Other'],
  isOther: Em.computed.equal('coverageType', 'Other'),
  
  actions: {
    save: function(model) {
      if (this.get('isOther')) this.set('coverageType', this.get('coverageTypeOther'));

      this.set('errors', {});
      if (validate(this, this.get('validations'))) {
        var controller = this, model = this.get('model');
        job = this.store.createRecord('job', {
          timestamp:    new Date().getTime(),
          title:        model.title,
          fullName:     model.fullName,
          email:        model.email,
          phone:        model.phone,
          contact:      model.contact,
          section:      model.section,
          coverageType: model.coverageType,
          dueDate:      model.dueDate,
          dueTime:      model.dueTime,
          details:      model.details,
          state:        0,
          loc:          model.loc,
          date:         model.date,
          time:         model.time
        });

        job.save().then(function() {
          controller.set('model', {
            timestamp: null,
            title: '',
            fullName: '',
            email: '',
            phone: '',
            contact: '',
            section: '',
            coverageType: '',
            dueDate: '',
            dueTime: '',
            details: '',
            state: 0,
            loc: '',
            date: '',
            time: '',
          });
          $.ajax({
            type: 'POST',
            url: '/mail_job?type=job',
            data: {
              job: job.get('data')
            },
            success: function(response) {
              return Bootstrap.NM.push('Successfully notified the administrator.', 'success');
            },
            error: function(response) {
              return Bootstrap.NM.push('Failed to notify the administrator.', 'danger');
            },
            dataType: 'json'
          });
          return Bootstrap.NM.push('Successfully submitted a job request.', 'success');
        }, function() {
          return Bootstrap.NM.push('Failed to submit a job request.', 'danger');
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
