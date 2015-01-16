import Ember from 'ember';

export default Ember.ObjectController.extend({
  isOther: Ember.computed.equal('coverageType', 'Other'),

  actions: {
    save: function(model) {
      if (this.get('isOther')) {
        this.set('coverageType', this.get('coverageTypeOther'));
      }

      var controller = this;
      model.set('state', 0); // make it unassigned
      model.save().then(function(job) {
        var d = job.get('data');
        Ember.$.ajax({
          type: 'POST',
          url: 'api/mail_job?type=update_job',
          data: {
            timestamp:    d.timestamp,
            title:        d.title,
            fullName:     d.fullName,
            email:        d.email,
            phone:        d.phone,
            contact:      d.contact,
            section:      d.section,
            coverageType: d.coverageType,
            publishDate:  d.publishDate,
            dueDate:      d.dueDate,
            details:      d.details,
            state:        d.state,
            loc:          d.loc,
            date:         d.date,
            time:         d.time
          },
          success: function() {
            controller.notify.success('Successfully notified administrator.');
            controller.transitionToRoute('jobs');
          },
          error: function() {
            controller.notify.alert('Failed to notify the administrator.');
          },
          dataType: 'json'
        });

        controller.notify.success('Successfully saved the job.');
      }, function() {
        controller.notify.alert('Failed to save the job.');
      });
    }
  },
});
