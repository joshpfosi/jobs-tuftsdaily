define("jobs-tuftsdaily/adapters/application", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];

    __exports__["default"] = DS.ActiveModelAdapter.extend({
      namespace: "api"
    });
  });
define("jobs-tuftsdaily/app", 
  ["ember","ember/resolver","ember/load-initializers","jobs-tuftsdaily/config/environment","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Resolver = __dependency2__["default"];
    var loadInitializers = __dependency3__["default"];
    var config = __dependency4__["default"];

    Ember.MODEL_FACTORY_INJECTIONS = true;

    var App = Ember.Application.extend({
      modulePrefix: config.modulePrefix,
      podModulePrefix: config.podModulePrefix,
      Resolver: Resolver
    });

    loadInitializers(App, config.modulePrefix);
    loadInitializers(App, "rails-csrf");

    __exports__["default"] = App;
  });
define("jobs-tuftsdaily/components/accordion-collapse", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Component.extend({
      dataParent: (function () {
        return "#" + this.get("parentId");
      }).property("parentId"),
      href: (function () {
        return "#" + this.get("collapseId");
      }).property("collapseId"),
      headingId: (function () {
        return this.get("collapseId") + "Heading";
      }).property("collapseId") });
  });
define("jobs-tuftsdaily/components/em-modal-body", 
  ["ember-idx-modal/modal-body","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var BodyComponent = __dependency1__["default"];

    __exports__["default"] = BodyComponent;
  });
define("jobs-tuftsdaily/components/em-modal-confirm-with-reason", 
  ["ember-idx-modal/modal-confirm-with-reason","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ConfirmWithReasonModal = __dependency1__["default"];

    __exports__["default"] = ConfirmWithReasonModal;
  });
define("jobs-tuftsdaily/components/em-modal-confirm", 
  ["ember-idx-modal/modal-confirm","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ModalConfirm = __dependency1__["default"];

    __exports__["default"] = ModalConfirm;
  });
define("jobs-tuftsdaily/components/em-modal-emform", 
  ["ember-idx-modal/modal-emform","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ModalEmFormComponent = __dependency1__["default"];

    __exports__["default"] = ModalEmFormComponent;
  });
define("jobs-tuftsdaily/components/em-modal-footer", 
  ["ember-idx-modal/modal-footer","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var FooterComponent = __dependency1__["default"];

    __exports__["default"] = FooterComponent;
  });
define("jobs-tuftsdaily/components/em-modal-form", 
  ["ember-idx-modal/modal-form","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ModalFormComponent = __dependency1__["default"];

    __exports__["default"] = ModalFormComponent;
  });
define("jobs-tuftsdaily/components/em-modal-title", 
  ["ember-idx-modal/modal-title","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var TitleComponent = __dependency1__["default"];

    __exports__["default"] = TitleComponent;
  });
define("jobs-tuftsdaily/components/em-modal-toggler", 
  ["ember-idx-modal/modal-toggler","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var TogglerComponent = __dependency1__["default"];

    __exports__["default"] = TogglerComponent;
  });
define("jobs-tuftsdaily/components/em-modal", 
  ["ember-idx-modal/modal","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ModalComponent = __dependency1__["default"];

    __exports__["default"] = ModalComponent;
  });
define("jobs-tuftsdaily/components/ember-notify", 
  ["ember-notify/components/ember-notify","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Notify = __dependency1__["default"];
    __exports__["default"] = Notify;
  });
define("jobs-tuftsdaily/components/form-field-select", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Component.extend({
      labelPath: (function () {
        var optionLabelPath = this.get("optionLabelPath");
        return optionLabelPath === undefined ? "content" : optionLabelPath;
      }).property("optionLabelPath"),
      valuePath: (function () {
        var optionValuePath = this.get("optionValuePath");
        return optionValuePath === undefined ? "content" : optionValuePath;
      }).property("optionValuePath")
    });
  });
define("jobs-tuftsdaily/components/form-field-text", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Component.extend({
      classNameBindings: [":form-group", "error:has-error"]
    });
  });
define("jobs-tuftsdaily/components/spin-spinner", 
  ["ember-spin-spinner/components/spin-spinner","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var SpinSpinnerComponent = __dependency1__["default"];

    __exports__["default"] = SpinSpinnerComponent;
  });
define("jobs-tuftsdaily/controllers/archive", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    // given a column and an array of jobs, returns the array sorted by the property
    // given by column
    function sortColumns(column, array) {
      if (!array) {
        throw "Cannot call sortColumns() with null array";
      }

      switch (column) {
        case "id":
          return array.sort(function (a, b) {
            return parseInt(a.get("id")) - parseInt(b.get("id"));
          });
        case "dueDate":
          return array.sort(function (a, b) {
            // covert date to integers
            return new Date(a.get("dueDate")).getTime() - new Date(b.get("dueDate")).getTime();
          });
        default:
          return array.sortBy(column);
      }
    }

    __exports__["default"] = Ember.ArrayController.extend({
      columns: [Ember.Object.create({ value: "", name: "" }), Ember.Object.create({ value: "id", name: "#" }), Ember.Object.create({ value: "title", name: "Title" }), Ember.Object.create({ value: "fullName", name: "Full Name" }), Ember.Object.create({ value: "email", name: "Email" }), Ember.Object.create({ value: "phone", name: "Phone" }), Ember.Object.create({ value: "section", name: "Section" }), Ember.Object.create({ value: "coverageType", name: "Coverage" }), Ember.Object.create({ value: "publishDate", name: "Publish Date" }), Ember.Object.create({ value: "dueDate", name: "Due Date" })],
      sortProperty: "id",
      sortDirection: true, // ascending by default

      filteredJobs: (function () {
        var jobs = this.get("content"),
            sortProperty = this.get("sortProperty"),
            sortDirection = this.get("sortDirection");
        // if filter selected, apply filterBy, otherwise don't
        jobs = sortColumns(sortProperty, jobs.get("content"));

        // if descending, reverse array
        return sortDirection ? jobs : jobs.reverse();
      }).property("content", "sortProperty", "sortDirection"),

      actions: {
        toggleSort: function (column) {
          if (this.get("sortProperty") === column) {
            this.toggleProperty("sortDirection");
          } else {
            this.set("sortProperty", column);
            this.set("sortDirection", true);
          }
        }
      } });
  });
define("jobs-tuftsdaily/controllers/collapse", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.ObjectController.extend({
      idTag: (function () {
        return "member" + this.get("id");
      }).property(),
      href: (function () {
        return "#" + this.get("idTag");
      }).property() });
  });
define("jobs-tuftsdaily/controllers/column-item", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.ObjectController.extend({
      sortProperty: Ember.computed.alias("parentController.sortProperty"),
      sortAscending: Ember.computed.alias("parentController.sortDirection"),
      sortDescending: Ember.computed.not("sortAscending"),

      isSorted: (function () {
        return this.get("sortProperty") === this.get("value");
      }).property("sortProperty", "value"),

      sortedAsc: Ember.computed.and("sortAscending", "isSorted"),
      sortedDesc: Ember.computed.and("sortDescending", "isSorted")
    });
  });
define("jobs-tuftsdaily/controllers/index", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    function getEditorEmail(section) {
      switch (section) {
        case "News":
          return "tuftsdailynews@gmail.com";
        case "Features":
          return "tuftsfeatures@gmail.com";
        case "Sports":
          return "sports@tuftsdaily.com";
        case "Arts":
          return "dzennir@aol.com";
        case "Multimedia":
          return "tuftsdailymedia@gmail.com";
        case "Op-Ed":
          return "tuftsdailyoped@gmail.com";
      }
      return ""; // should never occur
    }

    __exports__["default"] = Ember.ObjectController.extend({
      sections: ["News", "Features", "Sports", "Arts", "Multimedia", "Op-Ed"],
      coverageTypes: ["Portrait/Headshot", "Event", "Lecture", "Feature Story", "File Photo", "Stock", "Other"],
      isOther: Ember.computed.equal("coverageType", "Other"),

      actions: {
        save: function (model) {
          // disable to prevent double clicking until ajax returns
          Ember.$(".btn-block").addClass("disabled");

          if (this.get("isOther")) {
            this.set("coverageType", this.get("coverageTypeOther"));
          }

          var controller = this;
          model.save().then(function (job) {
            controller.set("model", controller.store.createRecord("job"));

            var editorEmail = getEditorEmail(job.get("section"));
            if (editorEmail === "") {
              throw "getEditorEmail called with invalid section" + job.get("section");
            }

            // send mail
            Ember.$.ajax({
              type: "POST", url: "api/mail_job?type=job",
              data: { job: job.get("data"), editorEmail: editorEmail },
              success: function () {
                Ember.$(".btn-block").removeClass("disabled");
                controller.notify.success("Successfully notified the administrator.");
              },
              error: function () {
                Ember.$(".btn-block").removeClass("disabled");
                controller.notify.alert("Failed to notify the administrator - please contact him.");
              },
              dataType: "json"
            });
            controller.notify.success("Successfully submitted a job request.");
          }, function () {
            // failed to save job record
            Ember.$(".btn-block").removeClass("disabled");
            controller.notify.alert("Failed to submit a job request.");
          });
        }
      } });
  });
define("jobs-tuftsdaily/controllers/job-edit", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.ObjectController.extend({
      isOther: Ember.computed.equal("coverageType", "Other"),

      actions: {
        save: function (model) {
          if (this.get("isOther")) {
            this.set("coverageType", this.get("coverageTypeOther"));
          }

          var controller = this;
          model.set("state", 0); // make it unassigned
          model.save().then(function (job) {
            var d = job.get("data");
            Ember.$.ajax({
              type: "POST",
              url: "api/mail_job?type=update_job",
              data: {
                timestamp: d.timestamp,
                title: d.title,
                fullName: d.fullName,
                email: d.email,
                phone: d.phone,
                contact: d.contact,
                section: d.section,
                coverageType: d.coverageType,
                publishDate: d.publishDate,
                dueDate: d.dueDate,
                details: d.details,
                state: d.state,
                loc: d.loc,
                date: d.date,
                time: d.time
              },
              success: function () {
                controller.notify.success("Successfully notified administrator.");
                controller.transitionToRoute("jobs");
              },
              error: function () {
                controller.notify.alert("Failed to notify the administrator.");
              },
              dataType: "json"
            });

            controller.notify.success("Successfully saved the job.");
          }, function () {
            controller.notify.alert("Failed to save the job.");
          });
        }
      } });
  });
define("jobs-tuftsdaily/controllers/jobs", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    // given a column and an array of jobs, returns the array sorted by the property
    // given by column
    function sortColumns(column, array) {
      if (!array) {
        throw "Cannot call sortColumns() with null array";
      }

      switch (column) {
        case "id":
          return array.sort(function (a, b) {
            return parseInt(a.get("id")) - parseInt(b.get("id"));
          });
        case "dueDate":
          return array.sort(function (a, b) {
            // covert date to integers
            return new Date(a.get("dueDate")).getTime() - new Date(b.get("dueDate")).getTime();
          });
        default:
          return array.sortBy(column);
      }
    }

    function generateSubjectAssign(coverageType, deadline) {
      return "Tufts Daily Photo Assignment: " + coverageType + " due on " + deadline;
    }

    function generateBodyAssign(title, name, coverageType, contact, deadline, loc, time, date, details) {
      return "Dear " + name + ",\n\nPlease cover the following assignment and let me know if you are unable to.\n\nSlug: " + title + "\n\nEvent Details:\n\nCoverage type: <%= @coverage_type %>\nContact information for the subject: " + contact + "\nDue on the Photoshelter server by: " + deadline + "\n\nWhere: " + location + "\nWhen: " + date + " " + time + "\n\nDetails: " + details + "\nThank you for working on this assignment. If you have any questions please call Nick at 603-686-3733 or reply to this email. Please deliver all images onto the Photoshelter server via FTP by the specified deadline with captions, keywords, and proper toning. Full sized JPGs will suffice.\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n";
    }

    __exports__.generateBodyAssign = generateBodyAssign;function generateSubjectReject(coverageType) {
      return "Your request for " + coverageType + " needs more detail";
    }

    __exports__.generateSubjectReject = generateSubjectReject;function generateBodyReject(name, coverageType, title, details, deadline, timestamp, id) {
      return "Dear " + name + ",\n\nYou have submitted a request:\n\nTitle: " + title + "\nCoverage Type: " + coverageType + "\nDescription: " + details + "\nDeadline: " + deadline + "\nSubmitted on: " + timestamp + "\n\nThank you for taking the time to do this. Unfortunately we are unable to cover your request.\n\n[Reason for rejection]\n\nPlease reply with any modification or additional ideas you may have, or edit the job request directly at:\n\n http://jobs-tuftsdaily.herokuapp.com/#/job/" + id + "\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n";
    }

    __exports__.generateBodyReject = generateBodyReject;
    __exports__["default"] = Ember.ArrayController.extend({
      columns: [Ember.Object.create({ value: "", name: "" }), Ember.Object.create({ value: "id", name: "#" }), Ember.Object.create({ value: "title", name: "Title" }), Ember.Object.create({ value: "fullName", name: "Full Name" }), Ember.Object.create({ value: "email", name: "Email" }), Ember.Object.create({ value: "phone", name: "Phone" }), Ember.Object.create({ value: "section", name: "Section" }), Ember.Object.create({ value: "coverageType", name: "Coverage" }), Ember.Object.create({ value: "publishDate", name: "Publish Date" }), Ember.Object.create({ value: "dueDate", name: "Due Date" })],
      filters: [{ name: "All", state: null }, { name: "Unassigned", state: 0 }, { name: "Assigned", state: 1 }, { name: "Rejected", state: 2 }, { name: "Completed", state: 3 }],
      filter: null, // state number to filter by
      sortProperty: "publishDate",
      sortDirection: true, // ascending by default

      filteredJobs: (function () {
        var jobs = this.get("content"),
            filter = this.get("filter"),
            sortProperty = this.get("sortProperty"),
            sortDirection = this.get("sortDirection");
        // if filter selected, apply filterBy, otherwise don't
        jobs = filter !== null ? sortColumns(sortProperty, jobs.filterBy("state", filter)) : sortColumns(sortProperty, jobs.get("content"));

        // if descending, reverse array
        return sortDirection ? jobs : jobs.reverse();
      }).property("content", "content.@each.state", "filter", "sortProperty", "sortDirection"),

      selectedJobs: Ember.computed.filterBy("content", "selected"),
      selectedDailyMember: null,
      isSelectedJobs: Ember.computed.notEmpty("selectedJobs"),
      isNotSelectedJobs: Ember.computed.not("isSelectedJobs"),
      isSelectedDailyMember: Ember.computed.notEmpty("selectedDailyMember"),
      isAssignable: Ember.computed.and("isSelectedDailyMember", "isSelectedJobs"),
      isNotAssignable: Ember.computed.not("isAssignable"),

      actions: {
        deleteJob: function (job) {
          job.destroyRecord();
        },
        toggleSort: function (column) {
          if (this.get("sortProperty") === column) {
            this.toggleProperty("sortDirection");
          } else {
            this.set("sortProperty", column);
            this.set("sortDirection", true);
          }
        },
        changeState: function (state) {
          this.get("selectedJobs").slice().map(function (job) {
            job.set("selected", false); // uncheck box
            job.set("state", state); // set to complete
            job.save();
          });
        },
        setupMailAssign: function () {
          var job = this.get("selectedJobs")[0].get("data"),
              deadline = job.dueDate;

          var member = this.get("selectedDailyMember.data"),
              name = member.name;
          this.set("email", member.email);

          this.set("subject", generateSubjectAssign(job.coverageType, deadline));
          this.set("body", generateBodyAssign(job.title, name, job.coverageType, job.contact, deadline, job.loc, job.time, job.date, job.details));
        },
        setupMailReject: function () {
          var job = this.get("selectedJobs")[0].get("data"),
              deadline = job.dueDate;
          this.set("email", job.email);
          this.set("subject", generateSubjectReject(job.coverageType));
          this.set("body", generateBodyReject(job.fullName, job.coverageType, job.title, job.details, deadline, job.createdAt, job.id));
        },
        mailJobAssign: function () {
          var controller = this,
              job = this.get("selectedJobs")[0],
              member = this.get("selectedDailyMember"),
              email = this.get("email"),
              deadline = job.get("dueDate"),
              data = {
            title: job.get("title"),
            email: email,
            subject: this.get("subject"),
            name: member.get("name"),
            coverageType: job.get("coverageType"),
            contact: job.get("contact"),
            deadline: deadline,
            loc: job.get("loc"),
            time: job.get("time"),
            date: job.get("date"),
            details: job.get("details")
          };

          Ember.$.ajax({
            type: "POST",
            url: "api/mail_job?type=assign",
            data: data,
            success: function () {
              job.set("selected", false); // uncheck the check box
              job.set("state", 1); // assign it

              // establish associations
              var currentMem = job.get("daily_member"); // unassign old member
              if (currentMem !== undefined) {
                currentMem.get("jobs").removeObject(job);
              }
              job.set("daily_member", member); // assign new one
              job.save();

              member.get("jobs").pushObject(job);
              member.save();

              controller.notify.success("Successfully sent email to " + email + " regarding job " + job.get("title") + ".");
            },
            error: function () {
              controller.notify.alert("Failed to send email to " + email + " regarding job " + job.get("title") + ".");
            },
            dataType: "json"
          });
        },
        mailJobReject: function () {
          var controller = this,
              job = this.get("selectedJobs")[0],
              deadline = job.get("dueDate"),
              email = job.get("email"),
              data = {
            email: email,
            subject: this.get("subject"),
            name: job.get("fullName"),
            coverage_type: job.get("coverageType"),
            title: job.get("title"),
            deadline: deadline,
            timestamp: job.get("createdAt"),
            details: job.get("details"),
            reason: this.get("reason"),
            id: job.get("id")
          };

          Ember.$.ajax({
            type: "POST",
            url: "/mail_job?type=reject",
            data: data,
            success: function () {
              job.set("selected", false); // uncheck the check box
              job.set("state", 2); // reject it

              // clear associations
              var member = job.get("daily_member");
              // if assigned, remove job from daily_member and daily_member from job
              if (member !== null) {
                member.get("jobs").removeObject(job);
                member.save();
                job.set("daily_member", null);
              }
              job.save();

              controller.notify.success("Successfully sent email to " + job.get("email") + " regarding job " + job.get("title") + ".");
            },
            error: function () {
              controller.notify.danger("Failed to send email to " + email + " regarding job " + job.get("title") + ".");
            },
            dataType: "json"
          });
        }
      } });
  });
define("jobs-tuftsdaily/controllers/projects", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.ArrayController.extend({
      newProjectModalButtons: [Ember.Object.create({ title: "Create", clicked: "createProject" }), Ember.Object.create({ title: "Cancel", clicked: "cancel", dismiss: "modal" })],
      actions: {
        deleteProject: function (project) {
          project.destroyRecord();
        },
        showNewProject: function (project) {
          if (project) {
            this.set("editProject", project);
            this.set("title", project.get("title"));
            this.set("author", project.get("author"));
            this.set("startDate", project.get("startDate"));
            this.set("publishDate", project.get("publishDate"));
            this.set("notes", project.get("notes"));
          }
          return Bootstrap.ModalManager.show("newProject");
        },
        cancel: function () {
          this.set("title", "");
          this.set("author", "");
          this.set("startDate", "");
          this.set("publishDate", "");
          this.set("notes", "");
        },
        createProject: function () {
          var newProject = this.get("editProject");
          this.set("errors", {}); // move validation into the controller
          if (!newProject) {
            // if newProject is undefined
            newProject = this.store.createRecord("project", {
              title: this.get("title"),
              author: this.get("author"),
              startDate: this.get("startDate"),
              publishDate: this.get("publishDate"),
              notes: this.get("notes")
            });
          }
          // if defined, then editing an existing member so update all fields
          else {
            newProject.set("title", this.get("title"));
            newProject.set("author", this.get("author"));
            newProject.set("startDate", this.get("startDate"));
            newProject.set("publishDate", this.get("publishDate"));
            newProject.set("notes", this.get("notes"));
          }

          var controller = this;
          newProject.save().then(function () {
            controller.send("cancel");
            controller.notify.success("Succesfully added " + controller.get("title") + ".");
          }, function () {
            controller.notify.alert("Failed to add " + controller.get("title") + ".");
          });

          return Bootstrap.ModalManager.close("newProject");
        } },
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
  });
define("jobs-tuftsdaily/controllers/settings", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.ArrayController.extend({
      email: null,
      editMember: null,
      hasEditMemberObs: (function () {
        this.set("hasEditMember", this.get("editMember") !== null);
      }).observes("editMember"),
      hasEditMember: false,
      success: false,

      days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      sportsAnswers: ["Yes", "No"],
      positions: ["Executive Photo Editor", "Photo Administrator", "Picture Tufts Editor", "Picture Tufts Contributor", "Stock Image Editor", "Section Liaison", "Staff Photographer", "Project Photographer", "Trainee", "Inactive"],

      selectedMembers: Ember.computed.filterBy("content", "selected"),
      isSelectedMembers: Ember.computed.empty("selectedMembers"),

      selectedAll: false,
      selectAll: (function () {
        var selected = this.get("selectedAll");
        this.get("content").forEach(function (member) {
          member.set("selected", selected);
        });
      }).observes("selectedAll"),

      actions: {
        deleteDailyMember: function (member) {
          // clear relationships
          member.get("jobs").forEach(function (job) {
            job.set("daily_member", null);job.save();
          });

          member.destroyRecord();
        },
        showNewDailyMember: function () {
          this.set("editMember", this.store.createRecord("daily_member"));
        },
        editOldDailyMember: function (member) {
          this.set("editMember", member);
        },
        createDailyMember: function () {
          var controller = this;
          return this.get("editMember").save().then(function (member) {
            controller.notify.success("Succesfully added " + member.get("name") + ".");
            controller.set("editMember", null);
            controller.set("hasEditMember", false);
            controller.set("success", true);
          }, function () {
            controller.notify.alert("Failed to save daily member.");
            controller.set("hasEditMember", true);
          });
        },
        setEmails: function () {
          var members = this.get("selectedMembers");
          this.set("email", members.mapBy("email"));
        },
        sendMailToMembers: function () {
          var controller = this,
              members = this.get("selectedMembers"),
              email = this.get("email"),
              data = {
            email: email,
            subject: this.get("subject"),
            body: this.get("body")
          };
          Ember.$.ajax({
            type: "POST",
            url: "api/mail_job?type=members",
            data: data,
            success: function () {
              members.slice().forEach(function (member) {
                member.set("selected", false); // uncheck the check boxes
              });

              controller.notify.success("Successfully sent email to " + email + ".");
            },
            error: function () {
              controller.notify.alert("Failed to send email to " + email + ".");
            },
            dataType: "json"
          });
        } } });
  });
define("jobs-tuftsdaily/controllers/stock", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    // given a column and an array of jobs, returns the array sorted by the property
    // given by column
    function sortColumns(column, array) {
      if (!array) {
        throw "Cannot call sortColumns() with null array";
      }

      switch (column) {
        case "id":
          return array.sort(function (a, b) {
            return parseInt(a.get("id")) - parseInt(b.get("id"));
          });
        case "dueDate":
          return array.sort(function (a, b) {
            // covert date to integers
            return new Date(a.get("dueDate")).getTime() - new Date(b.get("dueDate")).getTime();
          });
        default:
          return array.sortBy(column);
      }
    }


    __exports__["default"] = Ember.ArrayController.extend({
      columns: [Ember.Object.create({ value: "", name: "" }), Ember.Object.create({ value: "id", name: "#" }), Ember.Object.create({ value: "title", name: "Title" }), Ember.Object.create({ value: "fullName", name: "Full Name" }), Ember.Object.create({ value: "email", name: "Email" }), Ember.Object.create({ value: "phone", name: "Phone" }), Ember.Object.create({ value: "section", name: "Section" }), Ember.Object.create({ value: "coverageType", name: "Coverage" }), Ember.Object.create({ value: "publishDate", name: "Publish Date" }), Ember.Object.create({ value: "dueDate", name: "Due Date" })],
      sortProperty: "id",
      sortDirection: true, // ascending by default

      filteredJobs: (function () {
        var jobs = this.get("content"),
            sortProperty = this.get("sortProperty"),
            sortDirection = this.get("sortDirection");
        // if filter selected, apply filterBy, otherwise don't
        jobs = sortColumns(sortProperty, jobs.get("content"));

        // if descending, reverse array
        return sortDirection ? jobs : jobs.reverse();
      }).property("content", "sortProperty", "sortDirection"),

      selectedJobs: Ember.computed.filterBy("content", "selected"),
      isSelectedJobs: Ember.computed.empty("selectedJobs"),

      actions: {
        toggleSort: function (column) {
          if (this.get("sortProperty") === column) {
            this.toggleProperty("sortDirection");
          } else {
            this.set("sortProperty", column);
            this.set("sortDirection", true);
          }
        },
        changeState: function (state) {
          this.get("selectedJobs").slice().map(function (job) {
            job.set("selected", false); // uncheck box
            job.set("state", state); // set to complete
            job.save();
          });
        },
        showMailModal: function (type) {
          var job = this.get("selectedJobs")[0].get("data"),
              deadline = job.dueDate;
          if (type === "assign") {
            var member = this.get("selectedDailyMember.data"),
                name = member.name;
            this.set("email", member.email);

            this.set("subject", generateSubjectAssign(job.coverageType, deadline));
            this.set("body", generateBodyAssign(name, job.coverageType, job.contact, deadline, job.loc, job.time, job.date, job.details));

            Bootstrap.ModalManager.open("mailModal", "Assign Job: " + job.title, "mail_assign", this.mailJobAssign, this);
          } else {
            // type === 'reject'
            this.set("email", job.email);
            this.set("subject", generateSubjectReject(job.coverageType));
            this.set("body", generateBodyReject(job.fullName, job.coverageType, job.details, deadline, job.createdAt, job.id));

            Bootstrap.ModalManager.open("mailModal", "Reject Job: " + job.title, "mail_reject", this.mailJobReject, this);
          }
        },
        closeMailModal: function () {
          this.set("reason", "");
          this.set("subject", "");
          this.set("body", "");
        },
        mailJobReject: function () {
          var controller = this,
              job = this.get("selectedJobs")[0],
              deadline = job.get("dueDate"),
              email = job.get("email"),
              data = {
            email: email,
            subject: this.get("subject"),
            name: job.get("fullName"),
            coverage_type: job.get("coverageType"),
            title: job.get("title"),
            deadline: deadline,
            timestamp: job.get("createdAt"),
            details: job.get("details"),
            reason: this.get("reason"),
            id: job.get("id")
          };

          Ember.$.ajax({
            type: "POST",
            url: "/mail_job?type=reject",
            data: data,
            success: function () {
              controller.send("closeMailModal"); // clear the input fields
              job.set("selected", false); // uncheck the check box
              job.set("state", 2); // reject it

              // clear associations
              var member = job.get("daily_member");
              // if assigned, remove job from daily_member and daily_member from job
              if (member !== null) {
                member.get("jobs").removeObject(job);
                member.save();
                job.set("daily_member", null);
              }
              job.save();

              controller.notify.success("Successfully sent email to " + job.get("email") + " regarding job " + job.get("title") + ".");
            },
            error: function () {
              controller.notify.danger("Failed to send email to " + email + " regarding job " + job.get("title") + ".");
            },
            dataType: "json"
          });
          Bootstrap.ModalManager.close("mailModal");
        }
      } });
  });
define("jobs-tuftsdaily/helpers/clean-on-empty", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Handlebars.makeBoundHelper(function (data) {
      // if null, display a dash, otherwise just the data
      return data ? data : "-";
    });
  });
define("jobs-tuftsdaily/helpers/handlebar-helpers", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Handlebars.helper("toDate", function (time) {
      return new Date(time).toDateString();
    });
  });
define("jobs-tuftsdaily/helpers/helper", 
  [],
  function() {
    "use strict";
    //import Ember from 'ember';
    //
    //// given a column and an array of jobs, returns the array sorted by the property
    //// given by column
    //function sortColumns(column, array) {
    //  if (!array) {
    //    throw "Cannot call sortColumns() with null array";
    //  }
    //
    //  switch (column) {
    //    case 'id':
    //      return array.sort(function(a, b) {
    //        return parseInt(a.get('id')) - parseInt(b.get('id'));
    //      });
    //    case 'dueDate':
    //      return array.sort(function(a, b) { // covert date to integers
    //        return new Date(a.get('dueDate')).getTime() -
    //        new Date(b.get('dueDate')).getTime();
    //      });
    //    default:
    //      return array.sortBy(column);
    //  }
    //}
    //
    //function generateSubjectAssign(coverageType, deadline) {
    //  return "Tufts Daily Photo Assignment: " + coverageType + " due on " + deadline;
    //}
    //
    //export function generateBodyAssign(title, name, coverageType, contact, deadline, loc, time, date, details) {
    //  return "Dear " + name + ",\n\nPlease cover the following assignment and let me know if you are unable to.\n\nSlug: " + title + "\n\nEvent Details:\n\nCoverage type: <%= @coverage_type %>\nContact information for the subject: " + contact + "\nDue on the Photoshelter server by: " + deadline + "\n\nWhere: " + location + "\nWhen: " + date + " " + time + "\n\nDetails: " + details + "\nThank you for working on this assignment. If you have any questions please call Nick at 603-686-3733 or reply to this email. Please deliver all images onto the Photoshelter server via FTP by the specified deadline with captions, keywords, and proper toning. Full sized JPGs will suffice.\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n";
    //}
    //
    //export function generateSubjectReject(coverageType) {
    //  return "Your request for " + coverageType + " needs more detail";
    //}
    //
    //export function generateBodyReject(name, coverageType, title, details, deadline, timestamp, id) {
    //  return "Dear " + name + ",\n\nYou have submitted a request:\n\nTitle: " + title + "\nCoverage Type: " + coverageType + "\nDescription: " + details + "\nDeadline: " + deadline + "\nSubmitted on: " + timestamp + "\n\nThank you for taking the time to do this. Unfortunately we are unable to cover your request.\n\n[Reason for rejection]\n\nPlease reply with any modification or additional ideas you may have, or edit the job request directly at:\n\n http://jobs-tuftsdaily.herokuapp.com/#/job/" + id + "\n\nThank you,\n\nThe Tufts Daily Photo Team\n\n";
    //}
  });
define("jobs-tuftsdaily/helpers/test-breadcrumbs", 
  ["ember","ember-cli-bootstrap/utils/test-breadcrumbs","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var BsBreadcrumbs = __dependency2__["default"];

    debugger;
    __exports__["default"] = Ember.Handlebars.makeBoundHelper(BsBreadcrumbs);
  });
define("jobs-tuftsdaily/helpers/test-helper", 
  ["ember","ember-cli-bootstrap/utils/test-helper","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var testHelper = __dependency2__["default"];

    __exports__["default"] = Ember.Handlebars.makeBoundHelper(testHelper);
  });
define("jobs-tuftsdaily/initializers/config", 
  ["ember","ember-idx-utils/config","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Em = __dependency1__["default"];
    var Config = __dependency2__["default"];

    __exports__["default"] = {
      name: "ember-idx-modal",
      initialize: function () {
        if (!Em.Config) {
          Em.Config = Config = Config.create();
        }

        var defaultConfig = Config.getConfig("bs");
        if (!defaultConfig) {
          Config.addConfig("bs");
          defaultConfig = Config.getConfig("bs");
        }

        defaultConfig.modal = {
          classes: ["em-modal", "modal", "fade"],
          bodyClasses: ["modal-body"],
          titleClasses: ["modal-header"],
          footerClasses: ["modal-footer"]
        };
      }
    };
  });
define("jobs-tuftsdaily/initializers/ember-notify", 
  ["ember-notify","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Notify = __dependency1__["default"];

    __exports__["default"] = {
      name: "ember-notify",
      initialize: function (container, app) {
        container.optionsForType("notify", { instantiate: false, singleton: true });
        app.register("notify:main", Notify);
        app.inject("route", "notify", "notify:main");
        app.inject("controller", "notify", "notify:main");
      }
    };
  });
define("jobs-tuftsdaily/initializers/export-application-global", 
  ["ember","jobs-tuftsdaily/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];

    function initialize(container, application) {
      var classifiedName = Ember.String.classify(config.modulePrefix);

      if (config.exportApplicationGlobal) {
        window[classifiedName] = application;
      }
    };
    __exports__.initialize = initialize;
    __exports__["default"] = {
      name: "export-application-global",

      initialize: initialize
    };
  });
define("jobs-tuftsdaily/initializers/test-breadcrumbs", 
  ["jobs-tuftsdaily/helpers/test-breadcrumbs","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var testHelper = __dependency1__["default"];

    function initialize() {
      debugger;
      Ember.Handlebars.registerHelper("test-breadcrumbs", testHelper);
    };
    __exports__.initialize = initialize;
    __exports__["default"] = {
      name: "test-breadcrumbs",
      initialize: initialize
    };
    /* container, application */
  });
define("jobs-tuftsdaily/initializers/test-helper", 
  ["jobs-tuftsdaily/helpers/test-helper","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var testHelper = __dependency1__["default"];

    function initialize() {
      Ember.Handlebars.registerHelper("test-helper", testHelper);
    };
    __exports__.initialize = initialize;
    __exports__["default"] = {
      name: "test-helper",
      initialize: initialize
    };
    /* container, application */
  });
define("jobs-tuftsdaily/models/daily-member", 
  ["ember-data","ember-validations","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var EmberValidations = __dependency2__["default"];

    __exports__["default"] = DS.Model.extend(EmberValidations.Mixin, {
      position: DS.attr("string"),
      name: DS.attr("string"),
      email: DS.attr("string"),
      phone: DS.attr("string"),
      day: DS.attr("string"),
      backDay: DS.attr("string"),
      sports: DS.attr("string"),
      notes: DS.attr("string"),
      jobs: DS.hasMany("job", { async: true }),

      validations: {
        name: {
          length: {
            message: "Enter a name (min of 3 characters, max of 20)",
            minimum: 3,
            maximum: 20
          }
        },
        email: {
          format: {
            "with": /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            message: "Enter a valid email"
          }
        },
        phone: {
          format: {
            "with": /\d\d\d \d\d\d \d\d\d\d/,
            message: "Follow the placeholder exactly!"
          }
        },
        position: { presence: { message: "Enter a position for this person" } }
      }
    });
  });
define("jobs-tuftsdaily/models/job", 
  ["ember-data","ember-validations","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];
    var EmberValidations = __dependency2__["default"];

    __exports__["default"] = DS.Model.extend(EmberValidations.Mixin, {
      createdAt: DS.attr("utc", { defaultValue: new Date() }),
      title: DS.attr("string"),
      fullName: DS.attr("string"),
      email: DS.attr("string"),
      phone: DS.attr("string"),
      contact: DS.attr("string"),
      section: DS.attr("string"),
      coverageType: DS.attr("string"),
      publishDate: DS.attr("utc"),
      dueDate: DS.attr("utc"),
      details: DS.attr("string"),
      state: DS.attr("number", { defaultValue: 0 }),
      loc: DS.attr("string"),
      date: DS.attr("string"),
      time: DS.attr("string"),
      dailyMember: DS.belongsTo("daily-member", { async: true }),

      validations: {
        email: {
          format: {
            "with": /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            message: "Enter a valid email"
          }
        },
        title: { presence: { message: "Enter a title for the job" } },
        section: { presence: { message: "Choose a section from the list" } },
        coverageType: { presence: { message: "Enter the kind of coverage" } },
        publishDate: { presence: { message: "Enter a valid date" } },
        dueDate: { presence: { message: "Enter a valid date" } },
        details: { presence: { message: "You must submit details" } }
      }
      // NOTE state: 0 => unassigned, 1 => assigned, 2 => rejected 3 => completed, 4 => investigated, 5 => pending, 6 => archived
    });
  });
define("jobs-tuftsdaily/models/project", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];

    __exports__["default"] = DS.Model.extend({
      title: DS.attr("string"),
      author: DS.attr("string"),
      startDate: DS.attr("string"),
      publishDate: DS.attr("string"),
      notes: DS.attr("string") });
  });
define("jobs-tuftsdaily/router", 
  ["ember","jobs-tuftsdaily/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var config = __dependency2__["default"];

    var Router = Ember.Router.extend({
      location: config.locationType
    });

    Router.map(function () {
      this.route("jobs");
      this.route("settings");
      this.route("projects");
      this.route("archive");
      this.route("stock");
      this.route("job_edit", { path: "job/:job_id" });
      this.resource("mail_job");
    });

    __exports__["default"] = Router;
  });
define("jobs-tuftsdaily/routes/application", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      beforeModel: function () {
        return this.csrf.fetchToken();
      }
    });
  });
define("jobs-tuftsdaily/routes/archive", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function () {
        return this.store.filter("job", { equal_state: 6 }, function (job) {
          return job.get("state") === 6;
        });
      }
    });
  });
define("jobs-tuftsdaily/routes/index", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function () {
        return this.store.createRecord("job");
      },
      actions: {
        willTransition: function () {
          this.controllerFor("index").get("model").deleteRecord();
        }
      }
    });
  });
define("jobs-tuftsdaily/routes/job-edit", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function (params) {
        return this.store.find("job", params.job_id);
      },
      setupController: function (controller, model) {
        controller.set("model", model);
        controller.set("sections", this.controllerFor("index").get("sections"));
        controller.set("coverageTypes", this.controllerFor("index").get("coverageTypes"));
      }
    });
  });
define("jobs-tuftsdaily/routes/jobs", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function () {
        return this.store.filter("job", { not_equal_state: 6 }, function (job) {
          return job.get("state") !== 6;
        });
      },
      setupController: function (controller, model) {
        controller.set("model", model);
        this.store.find("daily_member").then(function (members) {
          controller.set("daily_members", members); // for use in drop down
        });
      }
    });
  });
define("jobs-tuftsdaily/routes/mail-job", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function () {
        return Ember.Object.create();
      }
    });
  });
define("jobs-tuftsdaily/routes/projects", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function () {
        return this.store.find("project");
      }
    });
  });
define("jobs-tuftsdaily/routes/settings", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function () {
        return this.store.find("daily_member");
      }
    });
  });
define("jobs-tuftsdaily/routes/stock", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    __exports__["default"] = Ember.Route.extend({
      model: function () {
        return this.store.filter("job", { coverageType: "stock" }, function (job) {
          var coverageType = job.get("coverageType");
          return (coverageType === "File Photo" || coverageType === "Stock") && job.get("state") !== 6;
        });
      }
    });
  });
define("jobs-tuftsdaily/templates/_mail-assign", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n      <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.toEmail", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n    ");
      return buffer;
      }

      data.buffer.push("<form role=\"form\">\n  <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.email:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n    <label for=\"email\">To:</label>\n    ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("email"),
        'placeholder': ("Enter an email..."),
        'readonly': (true)
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'readonly': "BOOLEAN"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'readonly': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n    ");
      stack1 = helpers['if'].call(depth0, "errors.toEmail", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n  </div>\n  <div class=\"form-group\">\n    <label for=\"subject\">Subject:</label>\n    ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("subject"),
        'placeholder': ("Enter a subject line...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n  </div>\n  <div class=\"form-group\">\n    <label for=\"body\">Body:</label>\n    ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
        'classNames': ("form-control"),
        'value': ("body"),
        'placeholder': ("Enter a body message..."),
        'rows': (8),
        'readonly': (true)
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'rows': "INTEGER",'readonly': "BOOLEAN"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'rows': depth0,'readonly': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n  </div>\n</form>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/_mail-reject", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


      data.buffer.push("<form role=\"form\">\n  <div class=\"form-group\">\n    <label for=\"email\">To:</label>\n    ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("email"),
        'placeholder': ("Enter an email..."),
        'readonly': (true)
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'readonly': "BOOLEAN"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'readonly': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n  </div>\n  <div class=\"form-group\">\n    <label for=\"subject\">Subject:</label>\n    ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("subject"),
        'placeholder': ("Enter a subject line...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n  </div>\n  <div class=\"form-group\">\n    <label for=\"subject\">Reason for Rejection:</label>\n    ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("reason"),
        'placeholder': ("Reason for rejection...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n  </div>\n  <div class=\"form-group\">\n    <label for=\"body\">Body:</label>\n    ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
        'classNames': ("form-control"),
        'value': ("body"),
        'placeholder': ("Enter a body message..."),
        'rows': (8),
        'readonly': (true)
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'rows': "INTEGER",'readonly': "BOOLEAN"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'rows': depth0,'readonly': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n  </div>\n</form>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/application", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

    function program1(depth0,data) {
      
      
      data.buffer.push("\n          <img class=\"logo\" src=\"/assets/logo.png\" alt=\"Tufts Daily Header Image\"/>\n        ");
      }

    function program3(depth0,data) {
      
      
      data.buffer.push("<button class=\"btn btn-brown navbar-btn\">Projects</button>");
      }

    function program5(depth0,data) {
      
      
      data.buffer.push("<button class=\"btn btn-brown navbar-btn\">Members</button>");
      }

    function program7(depth0,data) {
      
      
      data.buffer.push("    <button class=\"btn btn-brown navbar-btn\">Jobs</button>");
      }

    function program9(depth0,data) {
      
      
      data.buffer.push(" <button class=\"btn btn-brown navbar-btn\">Archive</button>");
      }

    function program11(depth0,data) {
      
      
      data.buffer.push("   <button class=\"btn btn-brown navbar-btn\">Research Requests</button>");
      }

      data.buffer.push("<div class=\"wrapper\">\n  <nav class=\"nav navbar navbar-default\" role=\"navigation\">\n    <div class=\"container-fluid\">\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#tufts-nav\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar tufts-brown\"></span>\n          <span class=\"icon-bar tufts-brown\"></span>\n          <span class=\"icon-bar tufts-brown\"></span>\n        </button>\n        ");
      stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
        'class': ("navbar-left navbar-btn")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "index", options) : helperMissing.call(depth0, "link-to", "index", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n      </div>\n      <div class=\"navbar-collapse collapse\" id=\"tufts-nav\" style=\"height: 1px;\">\n        ");
      stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
        'class': ("navbar-link navbar-right")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "projects", options) : helperMissing.call(depth0, "link-to", "projects", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
        'class': ("navbar-link navbar-right")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "settings", options) : helperMissing.call(depth0, "link-to", "settings", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
        'class': ("navbar-link navbar-right")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "jobs", options) : helperMissing.call(depth0, "link-to", "jobs", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
        'class': ("navbar-link navbar-right")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "archive", options) : helperMissing.call(depth0, "link-to", "archive", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
        'class': ("navbar-link navbar-right")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(11, program11, data),contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "stock", options) : helperMissing.call(depth0, "link-to", "stock", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </div>\n    </div>\n  </nav>\n\n    <!-- throw in some notifications for different things -->\n    ");
      data.buffer.push(escapeExpression((helper = helpers['ember-notify'] || (depth0 && depth0['ember-notify']),options={hash:{
        'messageStyle': ("bootstrap")
      },hashTypes:{'messageStyle': "STRING"},hashContexts:{'messageStyle': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "ember-notify", options))));
      data.buffer.push("\n\n  <div class=\"container\">\n    ");
      stack1 = helpers._triageMustache.call(depth0, "outlet", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n  </div>\n</div>\n\n<div class=\"footer\">\n  <hr>\n  <p class=\"text-muted credit\">Developed and designed by Joshua Pfosi</p>\n  <p class=\"text-muted credit\"> Copyright © 2014 Joshua Pfosi </p>\n</div>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/archive", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <th ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSort", "value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
      data.buffer.push(">\n          ");
      stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          ");
      stack1 = helpers['if'].call(depth0, "sortedAsc", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          \n          ");
      stack1 = helpers['if'].call(depth0, "sortedDesc", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        </th>\n        ");
      return buffer;
      }
    function program2(depth0,data) {
      
      
      data.buffer.push("\n            <i class=\"glyphicon glyphicon-chevron-up\"></i>\n          ");
      }

    function program4(depth0,data) {
      
      
      data.buffer.push("\n            <i class=\"glyphicon glyphicon-chevron-down\"></i>\n          ");
      }

      data.buffer.push("<div class=\"content job-list\">\n  <div style=\"margin-bottom:10px;\">\n    <span class=\"col-md-2 text-center col-sm-12 col-xs-12 col-padding\"><h4 style=\"margin:0;line-height:34px;\">Archived Jobs</h4></span>\n  </div>\n\n  <div class=\"table\">\n  <table class=\"table table-condensed\">\n    <thead>\n      <tr>\n        ");
      stack1 = helpers.each.call(depth0, "columns", {hash:{
        'itemController': ("columnItem")
      },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        <th>Edit</th>\n        <th>Details</th>\n      </tr>\n    </thead>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.collection || (depth0 && depth0.collection),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "jobs-collection", options) : helperMissing.call(depth0, "collection", "jobs-collection", options))));
      data.buffer.push("\n  </table>\n  </div>\n</div>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/components/em-modal-confirm", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

    function program1(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n    ");
      stack1 = (helper = helpers['em-modal-title'] || (depth0 && depth0['em-modal-title']),options={hash:{
        'classes': ("modal-title-classes")
      },hashTypes:{'classes': "ID"},hashContexts:{'classes': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-title", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-body']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-body']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-body']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-body', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-footer']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-footer']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-footer']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-footer', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      }
    function program2(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n        ");
      stack1 = (helper = helpers['em-modal-toggler'] || (depth0 && depth0['em-modal-toggler']),options={hash:{
        'class': ("close")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-toggler", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        <h4 class=\"modal-title\">");
      stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</h4>\n    ");
      return buffer;
      }
    function program3(depth0,data) {
      
      
      data.buffer.push("<span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span>");
      }

    function program5(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        ");
      stack1 = helpers._triageMustache.call(depth0, "message", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        <!--Confirmation with a reason-->\n        ");
      stack1 = helpers['if'].call(depth0, "reasonModal", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      return buffer;
      }
    function program6(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n        ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.Select", {hash:{
        'valueBinding': ("message"),
        'contentBinding': ("messages"),
        'optionValuePath': ("id"),
        'optionLabelPath': ("content.msg")
      },hashTypes:{'valueBinding': "STRING",'contentBinding': "STRING",'optionValuePath': "STRING",'optionLabelPath': "STRING"},hashContexts:{'valueBinding': depth0,'contentBinding': depth0,'optionValuePath': depth0,'optionLabelPath': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n        ");
      return buffer;
      }

    function program8(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n        ");
      data.buffer.push(escapeExpression((helper = helpers['em-button'] || (depth0 && depth0['em-button']),options={hash:{
        'class': ("cancel-button-classes"),
        'on-click': ("confirmPressed"),
        'default': ("submit-button-title"),
        'icon-default': ("submit-button-default-icons"),
        'icon-executing': ("submit-button-execute-icons"),
        'executing': ("submit-button-submitting-title")
      },hashTypes:{'class': "ID",'on-click': "STRING",'default': "ID",'icon-default': "ID",'icon-executing': "ID",'executing': "ID"},hashContexts:{'class': depth0,'on-click': depth0,'default': depth0,'icon-default': depth0,'icon-executing': depth0,'executing': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-button", options))));
      data.buffer.push("\n        ");
      stack1 = (helper = helpers['em-modal-toggler'] || (depth0 && depth0['em-modal-toggler']),options={hash:{
        'class': ("submit-button-classes")
      },hashTypes:{'class': "ID"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(9, program9, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-toggler", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      return buffer;
      }
    function program9(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n            <i class=\"fa fa-thumbs-o-down\"></i>\n            ");
      stack1 = helpers._triageMustache.call(depth0, "cancel-button-title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      return buffer;
      }

      stack1 = (helper = helpers['em-modal'] || (depth0 && depth0['em-modal']),options={hash:{
        'id': ("confirm-id"),
        'configName': ("configName"),
        'model-id': ("model-id"),
        'open-if': ("open-if"),
        'close-if': ("close-if"),
        'on-hide': ("on-hide")
      },hashTypes:{'id': "ID",'configName': "ID",'model-id': "ID",'open-if': "ID",'close-if': "ID",'on-hide': "ID"},hashContexts:{'id': depth0,'configName': depth0,'model-id': depth0,'open-if': depth0,'close-if': depth0,'on-hide': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      else { data.buffer.push(''); }
      
    });
  });
define("jobs-tuftsdaily/templates/components/em-modal", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var stack1, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            ");
      stack1 = helpers._triageMustache.call(depth0, "yield", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        </div>\n    </div>\n");
      return buffer;
      }

      stack1 = helpers['if'].call(depth0, "is-open", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      else { data.buffer.push(''); }
      
    });
  });
define("jobs-tuftsdaily/templates/components/ember-notify", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n  ");
      stack1 = helpers.view.call(depth0, "view.messageClass", {hash:{
        'message': ("message"),
        'class': ("clearfix")
      },hashTypes:{'message': "ID",'class': "STRING"},hashContexts:{'message': depth0,'class': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      }
    function program2(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n    <a ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "close", {hash:{
        'target': ("view")
      },hashTypes:{'target': "STRING"},hashContexts:{'target': depth0},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push(" class='close'>&times;</a>\n    <span class='message'>");
      stack1 = helpers._triageMustache.call(depth0, "message.message", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push(escapeExpression(helpers._triageMustache.call(depth0, "message.raw", {hash:{
        'unescaped': ("true")
      },hashTypes:{'unescaped': "STRING"},hashContexts:{'unescaped': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("</span>\n  ");
      return buffer;
      }

      stack1 = helpers.each.call(depth0, "message", "in", "messages", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/components/form-field-checkbox", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


      data.buffer.push("<div class=\"checkbox\">\n  <label> ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'type': ("checkbox"),
        'checked': ("checked")
      },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push(" ");
      stack1 = helpers._triageMustache.call(depth0, "label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push(" </label>\n</div>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/components/form-field-select", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n    <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "error", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n  ");
      return buffer;
      }

      data.buffer.push("<div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group error:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n  <label class=\"control-label\" for=\"value\">");
      stack1 = helpers._triageMustache.call(depth0, "label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</label>\n  ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
        'classNames': ("form-control"),
        'content': ("content"),
        'value': ("value"),
        'prompt': ("prompt"),
        'optionLabelPath': ("labelPath"),
        'optionValuePath': ("valuePath")
      },hashTypes:{'classNames': "STRING",'content': "ID",'value': "ID",'prompt': "ID",'optionLabelPath': "ID",'optionValuePath': "ID"},hashContexts:{'classNames': depth0,'content': depth0,'value': depth0,'prompt': depth0,'optionLabelPath': depth0,'optionValuePath': depth0},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push("\n  ");
      stack1 = helpers['if'].call(depth0, "error", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n</div>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/components/form-field-text", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n  ");
      data.buffer.push(escapeExpression((helper = helpers.textarea || (depth0 && depth0.textarea),options={hash:{
        'rows': ("rows"),
        'type': ("type"),
        'classNames': ("form-control"),
        'value': ("value"),
        'placeholder': ("placeholder"),
        'disabled': ("disabled"),
        'readonly': ("readonly")
      },hashTypes:{'rows': "ID",'type': "ID",'classNames': "STRING",'value': "ID",'placeholder': "ID",'disabled': "ID",'readonly': "ID"},hashContexts:{'rows': depth0,'type': depth0,'classNames': depth0,'value': depth0,'placeholder': depth0,'disabled': depth0,'readonly': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "textarea", options))));
      data.buffer.push("\n");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n  ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'type': ("type"),
        'classNames': ("form-control"),
        'value': ("value"),
        'placeholder': ("placeholder"),
        'disabled': ("disabled"),
        'readonly': ("readonly")
      },hashTypes:{'type': "ID",'classNames': "STRING",'value': "ID",'placeholder': "ID",'disabled': "ID",'readonly': "ID"},hashContexts:{'type': depth0,'classNames': depth0,'value': depth0,'placeholder': depth0,'disabled': depth0,'readonly': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n");
      return buffer;
      }

    function program5(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n  ");
      stack1 = helpers['if'].call(depth0, "error", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      }
    function program6(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n    <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "error", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n  ");
      return buffer;
      }

      data.buffer.push("<label class=\"control-label\" for=value>");
      stack1 = helpers._triageMustache.call(depth0, "label", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</label>\n");
      stack1 = helpers['if'].call(depth0, "rows", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      stack1 = helpers.unless.call(depth0, "hideMsg", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/index", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.fullName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program5(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program7(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.phone", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program9(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.section", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program11(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n        ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("coverageTypeOther"),
        'placeholder': ("Enter the kind of coverage...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      return buffer;
      }

    function program13(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n        ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
        'classNames': ("form-control"),
        'content': ("coverageTypes"),
        'value': ("coverageType"),
        'prompt': ("Select a coverage type")
      },hashTypes:{'classNames': "STRING",'content': "ID",'value': "ID",'prompt': "STRING"},hashContexts:{'classNames': depth0,'content': depth0,'value': depth0,'prompt': depth0},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push("\n      ");
      return buffer;
      }

    function program15(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.coverageType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program17(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.contact", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program19(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.publishDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program21(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.dueDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program23(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.details", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

      data.buffer.push("<div id=\"job-form\" class=\"content\">\n  <form role=\"form\">\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.title:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"title\">Slug*</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'name': ("title"),
        'value': ("title"),
        'placeholder': ("Enter a slug for the job...")
      },hashTypes:{'classNames': "STRING",'name': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'name': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.title", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.fullName:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"fullName\">Full Name</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("fullName"),
        'placeholder': ("Enter your full name...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.fullName", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.email:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"email\">Email*</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("email"),
        'placeholder': ("Enter your email address..."),
        'type': ("email")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.email", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.phone:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"phone\">Phone Number</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("phone"),
        'placeholder': ("### ### ####"),
        'type': ("tel")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.phone", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.section:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"section\">Section*</label>\n      ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
        'classNames': ("form-control"),
        'content': ("sections"),
        'value': ("section"),
        'prompt': ("Select a Daily section")
      },hashTypes:{'classNames': "STRING",'content': "ID",'value': "ID",'prompt': "STRING"},hashContexts:{'classNames': depth0,'content': depth0,'value': depth0,'prompt': depth0},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.section", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.coverageType:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"coverageType\">Coverage Type*</label>\n      ");
      stack1 = helpers['if'].call(depth0, "isOther", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.coverageType", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.contact:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"contact\">Contact Information for Subject / Event Coordinator</label>\n      ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
        'classNames': ("form-control"),
        'value': ("contact"),
        'placeholder': ("Enter the subject's contact information..."),
        'rows': ("2")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'rows': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.contact", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.publishDate:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"publishDate\">Publish Date*</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("publishDate"),
        'type': ("date")
      },hashTypes:{'classNames': "STRING",'value': "ID",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.publishDate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.dueDate:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"dueDate\">Due Date*</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("dueDate"),
        'type': ("date")
      },hashTypes:{'classNames': "STRING",'value': "ID",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.dueDate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.details:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"details\">Details*</label>\n      ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
        'classNames': ("form-control"),
        'value': ("details"),
        'placeholder': ("Enter any details..."),
        'rows': ("4")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'rows': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.details", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label\" for=\"location\">Event Location</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("loc"),
        'placeholder': ("Enter the event location...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n    </div>\n    <div class=\"form-group\">\n      <label class=\"control-label\" for=\"date\">Event Date</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("date"),
        'placeholder': ("Enter the event date..."),
        'type': ("date")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n    </div>\n    <div class=\"form-group\">\n      <label class=\"control-label\" for=\"time\">Event Time</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("time"),
        'placeholder': ("Enter the time of the event..."),
        'type': ("time")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n    </div>\n    <div style=\"padding-bottom: 15px;\" class=\"text-muted\">* indicates a required field</div>\n    <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
      data.buffer.push(" class=\"btn btn-primary btn-block\">Add Job</button>\n  </form>\n</div>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/job-edit", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.fullName", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program5(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program7(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.phone", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program9(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.section", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program11(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n        ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("coverageTypeOther"),
        'prompt': ("Enter the kind of coverage...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'prompt': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'prompt': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      return buffer;
      }

    function program13(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n        ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
        'classNames': ("form-control"),
        'content': ("coverageTypes"),
        'value': ("coverageType"),
        'placeholder': ("Select a coverage type")
      },hashTypes:{'classNames': "STRING",'content': "ID",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'content': depth0,'value': depth0,'placeholder': depth0},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push("\n      ");
      return buffer;
      }

    function program15(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.coverageType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program17(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.contact", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program19(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.publishDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program21(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program23(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.details", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

      data.buffer.push("<div id=\"job-form\" class=\"content\">\n  <form role=\"form\">\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.title:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"title\">Slug*</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("title"),
        'placeholder': ("Enter a slug for the job...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.title", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.fullName:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"fullName\">Full Name</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("fullName"),
        'placeholder': ("Enter your full name...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.fullName", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.email:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"email\">Email*</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("email"),
        'placeholder': ("Enter your email address..."),
        'type': ("email")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.email", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.phone:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"phone\">Phone Number</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("phone"),
        'placeholder': ("### ### ####"),
        'type': ("tel")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.phone", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.section:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"section\">Section*</label>\n      ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
        'classNames': ("form-control"),
        'content': ("sections"),
        'value': ("section"),
        'prompt': ("Select a Daily section")
      },hashTypes:{'classNames': "STRING",'content': "ID",'value': "ID",'prompt': "STRING"},hashContexts:{'classNames': depth0,'content': depth0,'value': depth0,'prompt': depth0},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.section", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.coverageType:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"coverageType\">Coverage Type*</label>\n      ");
      stack1 = helpers['if'].call(depth0, "isOther", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.coverageType", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.contact:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"contact\">Contact Information for Subject / Event Coordinator</label>\n      ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
        'classNames': ("form-control"),
        'value': ("contact"),
        'placeholder': ("Enter the subject's contact information..."),
        'rows': ("2")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'rows': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.contact", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.publishDate:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"publishDate\">Publish Date*</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("publishDate"),
        'type': ("date")
      },hashTypes:{'classNames': "STRING",'value': "ID",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.publishDate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.dueDate:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"dueDate\">Due Date*</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("dueDate"),
        'type': ("date")
      },hashTypes:{'classNames': "STRING",'value': "ID",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.dueDate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(21, program21, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.details:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"details\">Details*</label>\n      ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
        'classNames': ("form-control"),
        'value': ("details"),
        'placeholder': ("Enter any details..."),
        'rows': ("4")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'rows': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.details", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(23, program23, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"control-label\" for=\"location\">Event Location</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("loc"),
        'placeholder': ("Enter the event location...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n    </div>\n    <div class=\"form-group\">\n      <label class=\"control-label\" for=\"date\">Event Date</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("date"),
        'placeholder': ("Enter the event date..."),
        'type': ("date")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n    </div>\n    <div class=\"form-group\">\n      <label class=\"control-label\" for=\"time\">Event Time</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("time"),
        'placeholder': ("Enter the time of the event..."),
        'type': ("time")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n    </div>\n    <div style=\"padding-bottom: 15px;\" class=\"text-muted\">* indicates a required field</div>\n    <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "save", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
      data.buffer.push(" class=\"btn btn-primary btn-block\">Save Job</button>\n  </form>\n</div>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/job", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n          <dt>Event Location</dt>\n          <dd>");
      stack1 = helpers._triageMustache.call(depth0, "view.eventLoc", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</dd>\n          ");
      return buffer;
      }

    function program3(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n          <dt>Date</dt>\n          <dd>");
      stack1 = helpers._triageMustache.call(depth0, "date", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</dd>\n          ");
      return buffer;
      }

    function program5(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n          <dt>Time</dt>\n          <dd>");
      stack1 = helpers._triageMustache.call(depth0, "time", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("<dd>\n          ");
      return buffer;
      }

    function program7(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n          <br>\n          <dt>Assignee</dt>\n          <dd>");
      stack1 = helpers._triageMustache.call(depth0, "daily_member.name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</dd>\n          <dt>Contact Information</dt>\n          <dd>");
      stack1 = helpers._triageMustache.call(depth0, "daily_member.email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push(" | <em>");
      stack1 = helpers._triageMustache.call(depth0, "daily_member.phone", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</em></dd>\n          ");
      return buffer;
      }

      data.buffer.push("<tr>\n  <td>");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'type': ("checkbox"),
        'checked': ("selected")
      },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("</td>\n  <td>");
      stack1 = helpers._triageMustache.call(depth0, "id", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n  <td>\n    <a style=\"text-decoration:none\" data-toggle=\"collapse\" data-parent=\"#accordion\" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'href': ("view.href")
      },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">");
      stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</a>\n  </td>\n  <td>");
      data.buffer.push(escapeExpression((helper = helpers['clean-on-empty'] || (depth0 && depth0['clean-on-empty']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "fullName", options) : helperMissing.call(depth0, "clean-on-empty", "fullName", options))));
      data.buffer.push("</td>\n  <td>");
      data.buffer.push(escapeExpression((helper = helpers['clean-on-empty'] || (depth0 && depth0['clean-on-empty']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "email", options) : helperMissing.call(depth0, "clean-on-empty", "email", options))));
      data.buffer.push("</td>\n  <td>");
      data.buffer.push(escapeExpression((helper = helpers['clean-on-empty'] || (depth0 && depth0['clean-on-empty']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "phone", options) : helperMissing.call(depth0, "clean-on-empty", "phone", options))));
      data.buffer.push("</td>\n  <td>");
      stack1 = helpers._triageMustache.call(depth0, "section", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n  <td>");
      stack1 = helpers._triageMustache.call(depth0, "coverageType", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n  <td>");
      stack1 = helpers._triageMustache.call(depth0, "publishDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n  <td>");
      stack1 = helpers._triageMustache.call(depth0, "dueDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n  <td>\n    <a style=\"text-decoration:none\" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'href': ("view.edit")
      },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("><span class=\"glyphicon glyphicon-pencil\"></span></a>\n  </td>\n  <td>\n    <a style=\"text-decoration:none\" data-toggle=\"collapse\" data-parent=\"#accordion\" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'href': ("view.href")
      },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("> <span class=\"glyphicon glyphicon-list\"></span> </a>\n  </td>\n  <td>\n    <a ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteJob", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
      data.buffer.push(" style=\"text-decoration:none;\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n  </td>\n</tr>\n<tr>\n  <td colspan=\"13\" style=\"z-index: -1; padding: 0; text-align: left; position: relative; left: -1000px; padding-top: 50px; min-width: 600px;\">\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'id': ("view.id")
      },hashTypes:{'id': "STRING"},hashContexts:{'id': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(" class=\"panel-collapse collapse\">\n      <div class=\"panel-body\">\n        <dl class=\"dl-horizontal\">\n          <dt>Contact Information</dt>\n          <dd>");
      stack1 = helpers._triageMustache.call(depth0, "contact", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</dd>\n          <dt>Details</dt>\n          <dd>");
      stack1 = helpers._triageMustache.call(depth0, "details", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</dd>\n          ");
      stack1 = helpers['if'].call(depth0, "view.eventLoc", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          ");
      stack1 = helpers['if'].call(depth0, "date", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          ");
      stack1 = helpers['if'].call(depth0, "time", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          ");
      stack1 = helpers['if'].call(depth0, "daily_member", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        </dl>\n\n        <em style=\"padding-left:30px;\" class=\"text-muted\">Requested on ");
      stack1 = helpers._triageMustache.call(depth0, "createdAt", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</em>\n      </div>\n    </div>\n  </td>\n</tr>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/jobs", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

    function program1(depth0,data) {
      
      
      data.buffer.push("<span class=\"glyphicon glyphicon-envelope\"></span>");
      }

    function program3(depth0,data) {
      
      
      data.buffer.push("<span class=\"glyphicon glyphicon-trash\"></span>");
      }

    function program5(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <th ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSort", "value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
      data.buffer.push(">\n          ");
      stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          ");
      stack1 = helpers['if'].call(depth0, "sortedAsc", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(6, program6, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          \n          ");
      stack1 = helpers['if'].call(depth0, "sortedDesc", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(8, program8, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        </th>\n        ");
      return buffer;
      }
    function program6(depth0,data) {
      
      
      data.buffer.push("\n            <i class=\"glyphicon glyphicon-chevron-up\"></i>\n          ");
      }

    function program8(depth0,data) {
      
      
      data.buffer.push("\n            <i class=\"glyphicon glyphicon-chevron-down\"></i>\n          ");
      }

    function program10(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-title']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-title']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-title']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-title', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(11, program11, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-body']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-body']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-body']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-body', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-footer']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-footer']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-footer']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-footer', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      }
    function program11(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n        ");
      stack1 = (helper = helpers['em-modal-toggler'] || (depth0 && depth0['em-modal-toggler']),options={hash:{
        'class': ("close")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-toggler", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        <h4 class=\"modal-title\">Assign Job</h4>\n    ");
      return buffer;
      }
    function program12(depth0,data) {
      
      
      data.buffer.push("<span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span>");
      }

    function program14(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        ");
      stack1 = helpers['if'].call(depth0, "async", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(17, program17, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      return buffer;
      }
    function program15(depth0,data) {
      
      
      data.buffer.push("\n            Submitting, please wait...\n        ");
      }

    function program17(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n          ");
      data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "mail-assign", options) : helperMissing.call(depth0, "partial", "mail-assign", options))));
      data.buffer.push("\n        ");
      return buffer;
      }

    function program19(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n        <button type=\"submit\" class=\"btn btn-brown\" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'disabled': ("async")
      },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">Submit</button>\n    ");
      return buffer;
      }

    function program21(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-title']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-title']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-title']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-title', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(24, program24, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-body']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-body']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-body']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-body', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(24, program24, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-footer']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-footer']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-footer']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-footer', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(19, program19, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      }
    function program22(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n        ");
      stack1 = (helper = helpers['em-modal-toggler'] || (depth0 && depth0['em-modal-toggler']),options={hash:{
        'class': ("close")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(12, program12, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-toggler", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        <h4 class=\"modal-title\">Reject Job</h4>\n    ");
      return buffer;
      }

    function program24(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        ");
      stack1 = helpers['if'].call(depth0, "async", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(25, program25, data),fn:self.program(15, program15, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      return buffer;
      }
    function program25(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n          ");
      data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "mail-reject", options) : helperMissing.call(depth0, "partial", "mail-reject", options))));
      data.buffer.push("\n        ");
      return buffer;
      }

      data.buffer.push("<div class=\"content job-list\">\n  <div style=\"margin-bottom:10px;\">\n    <span class=\"col-md-2 text-center col-sm-12 col-xs-12 col-padding\"><h4 style=\"margin:0;line-height:34px;\">Current Jobs</h4></span>\n    <span class=\"col-md-2 col-sm-12 col-xs-12 col-padding\">\n      ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
        'class': ("form-control"),
        'content': ("filters"),
        'optionLabelPath': ("content.name"),
        'optionValuePath': ("content.state"),
        'value': ("filter")
      },hashTypes:{'class': "STRING",'content': "ID",'optionLabelPath': "STRING",'optionValuePath': "STRING",'value': "ID"},hashContexts:{'class': depth0,'content': depth0,'optionLabelPath': depth0,'optionValuePath': depth0,'value': depth0},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push("\n    </span>\n    <span id=\"daily-select\" class=\"col-md-4 col-sm-12 col-xs-12 col-padding\">\n      ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "select", {hash:{
        'class': ("form-control"),
        'content': ("daily_members"),
        'optionLabelPath': ("content.name"),
        'value': ("selectedDailyMember"),
        'prompt': ("Select a Daily member to assign")
      },hashTypes:{'class': "STRING",'content': "ID",'optionLabelPath': "STRING",'value': "ID",'prompt': "STRING"},hashContexts:{'class': depth0,'content': depth0,'optionLabelPath': depth0,'value': depth0,'prompt': depth0},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push("\n    </span>\n    <div class=\"col-md-4 col-sm-12 col-xs-12 col-padding\">\n      <div style=\"margin: auto; max-width: 260px;\">\n        ");
      stack1 = (helper = helpers['em-modal-toggler'] || (depth0 && depth0['em-modal-toggler']),options={hash:{
        'modal-id': ("assign"),
        'class': ("btn btn-info"),
        'disabled': ("isNotAssignable")
      },hashTypes:{'modal-id': "STRING",'class': "STRING",'disabled': "ID"},hashContexts:{'modal-id': depth0,'class': depth0,'disabled': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-toggler", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      stack1 = (helper = helpers['em-modal-toggler'] || (depth0 && depth0['em-modal-toggler']),options={hash:{
        'modal-id': ("reject"),
        'class': ("btn btn-danger"),
        'disabled': ("isNotSelectedJobs")
      },hashTypes:{'modal-id': "STRING",'class': "STRING",'disabled': "ID"},hashContexts:{'modal-id': depth0,'class': depth0,'disabled': depth0},inverse:self.noop,fn:self.program(3, program3, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-toggler", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeState", 0, {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","INTEGER"],data:data})));
      data.buffer.push(" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":btn :btn-default  isNotSelectedJobs:disabled")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("><span class=\"glyphicon glyphicon-eject\"></span></button>\n        <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeState", 4, {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","INTEGER"],data:data})));
      data.buffer.push(" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":btn :btn-warning  isNotSelectedJobs:disabled")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("><span class=\"glyphicon glyphicon-exclamation-sign\"></span></button>\n        <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeState", 5, {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","INTEGER"],data:data})));
      data.buffer.push(" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":btn :btn-primary  isNotSelectedJobs:disabled")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("><span class=\"glyphicon glyphicon-tasks\"></span></button>\n        <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeState", 3, {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","INTEGER"],data:data})));
      data.buffer.push(" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":btn :btn-success  isNotSelectedJobs:disabled")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("><span class=\"glyphicon glyphicon-ok\"></span></button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"table\">\n  <table class=\"table table-condensed\">\n    <thead>\n      <tr>\n        ");
      stack1 = helpers.each.call(depth0, "columns", {hash:{
        'itemController': ("columnItem")
      },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        <th>Edit</th>\n        <th>Details</th>\n        <th>Delete</th>\n      </tr>\n    </thead>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.collection || (depth0 && depth0.collection),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "jobs-collection", options) : helperMissing.call(depth0, "collection", "jobs-collection", options))));
      data.buffer.push("\n  </table>\n  </div>\n</div>\n\n");
      stack1 = (helper = helpers['em-modal-form'] || (depth0 && depth0['em-modal-form']),options={hash:{
        'configName': ("bs"),
        'id': ("assign"),
        'on-submit': ("mailJobAssign"),
        'in-async': ("async"),
        'on-show': ("setupMailAssign")
      },hashTypes:{'configName': "STRING",'id': "STRING",'on-submit': "STRING",'in-async': "ID",'on-show': "STRING"},hashContexts:{'configName': depth0,'id': depth0,'on-submit': depth0,'in-async': depth0,'on-show': depth0},inverse:self.noop,fn:self.program(10, program10, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-form", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n");
      stack1 = (helper = helpers['em-modal-form'] || (depth0 && depth0['em-modal-form']),options={hash:{
        'configName': ("bs"),
        'id': ("reject"),
        'on-submit': ("mailJobReject"),
        'in-async': ("async"),
        'on-show': ("setupMailReject")
      },hashTypes:{'configName': "STRING",'id': "STRING",'on-submit': "STRING",'in-async': "ID",'on-show': "STRING"},hashContexts:{'configName': depth0,'id': depth0,'on-submit': depth0,'in-async': depth0,'on-show': depth0},inverse:self.noop,fn:self.program(21, program21, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-form", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/loading", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


      data.buffer.push("<div class='loading-container'>\n  ");
      data.buffer.push(escapeExpression((helper = helpers['spin-spinner'] || (depth0 && depth0['spin-spinner']),options={hash:{
        'lines': (15),
        'length': (40),
        'width': (6),
        'radius': (20)
      },hashTypes:{'lines': "INTEGER",'length': "INTEGER",'width': "INTEGER",'radius': "INTEGER"},hashContexts:{'lines': depth0,'length': depth0,'width': depth0,'radius': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "spin-spinner", options))));
      data.buffer.push("\n</div>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/mail_members", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n      <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.toEmail", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n    ");
      return buffer;
      }

      data.buffer.push("<form role=\"form\">\n  <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.email:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n    <label for=\"email\">To:</label>\n    ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("email"),
        'placeholder': ("Enter an email..."),
        'readonly': (true)
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'readonly': "BOOLEAN"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'readonly': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n    ");
      stack1 = helpers['if'].call(depth0, "errors.toEmail", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n  </div>\n  <div class=\"form-group\">\n    <label for=\"subject\">Subject:</label>\n    ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("subject"),
        'placeholder': ("Enter a subject line...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n  </div>\n  <div class=\"form-group\">\n    <label for=\"body\">Body:</label>\n    ");
      data.buffer.push(escapeExpression(helpers.view.call(depth0, "Ember.TextArea", {hash:{
        'classNames': ("form-control"),
        'value': ("body"),
        'placeholder': ("Enter a body message..."),
        'rows': (8)
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING",'rows': "INTEGER"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0,'rows': depth0},contexts:[depth0],types:["ID"],data:data})));
      data.buffer.push("\n  </div>\n</form>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/projects", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, self=this, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        ");
      stack1 = helpers.each.call(depth0, {hash:{
        'itemController': ("collapse")
      },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[],types:[],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      return buffer;
      }
    function program2(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <tr>\n          <td>");
      stack1 = helpers._triageMustache.call(depth0, "title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n          <td>");
      stack1 = helpers._triageMustache.call(depth0, "author", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n          <td>");
      stack1 = helpers._triageMustache.call(depth0, "startDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n          <td>\n            ");
      stack1 = helpers['if'].call(depth0, "publishDate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          </td>\n          <td>\n            <a style=\"text-decoration:none\" data-toggle=\"collapse\" data-parent=\"#accordion\" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'href': ("href")
      },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("> <span class=\"glyphicon glyphicon-list\"></span> </a>\n          </td>\n          <td>\n            <a ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "showNewProject", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
      data.buffer.push(" style=\"text-decoration:none;\"><span class=\"glyphicon glyphicon-pencil\"></span></a>\n          </td>\n          <td>\n            <a ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteProject", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
      data.buffer.push(" style=\"text-decoration:none;\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"10\" style=\"padding: 0; text-align: left\">\n            <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'id': ("idTag")
      },hashTypes:{'id': "STRING"},hashContexts:{'id': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(" class=\"panel-collapse collapse\">\n              <div class=\"panel-body\">\n                ");
      stack1 = helpers['if'].call(depth0, "notes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n              </div>\n            </div>\n          </td>\n        </tr>\n        ");
      return buffer;
      }
    function program3(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n              ");
      stack1 = helpers._triageMustache.call(depth0, "publishDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n            ");
      return buffer;
      }

    function program5(depth0,data) {
      
      
      data.buffer.push("\n              -\n            ");
      }

    function program7(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push(" ");
      stack1 = helpers._triageMustache.call(depth0, "notes", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push(" ");
      return buffer;
      }

    function program9(depth0,data) {
      
      
      data.buffer.push(" <em>No notes for this project</em> ");
      }

    function program11(depth0,data) {
      
      
      data.buffer.push("\n          <tr><td colspan=10><em>You need some projects!</em></td></tr>\n        ");
      }

    function program13(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n  <form role=\"form\">\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.title:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label for=\"title\">Title</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("title"),
        'placeholder': ("Enter project title...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.title", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.author:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label for=\"author\">Author</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("author"),
        'placeholder': ("Enter author of this job...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.author", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(16, program16, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.publishDate:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"publishDate\">Publish Date</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("publishDate"),
        'type': ("date")
      },hashTypes:{'classNames': "STRING",'value': "ID",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.publishDate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.startDate:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label class=\"control-label\" for=\"startDate\">Start Date</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("startDate"),
        'type': ("date")
      },hashTypes:{'classNames': "STRING",'value': "ID",'type': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'type': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.startDate", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(20, program20, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n    <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":form-group errors.notes:has-error")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">\n      <label for=\"notes\">Notes</label>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'classNames': ("form-control"),
        'value': ("notes"),
        'placeholder': ("Enter any notes...")
      },hashTypes:{'classNames': "STRING",'value': "ID",'placeholder': "STRING"},hashContexts:{'classNames': depth0,'value': depth0,'placeholder': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("\n      ");
      stack1 = helpers['if'].call(depth0, "errors.notes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    </div>\n  </form>\n");
      return buffer;
      }
    function program14(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program16(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.author", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program18(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.publishDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program20(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.startDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

    function program22(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <span class=\"help-block\">");
      stack1 = helpers._triageMustache.call(depth0, "errors.notes", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</span>\n      ");
      return buffer;
      }

      data.buffer.push("<div class=\"table-responsive content job-list\">\n  <span class=\"col-md-2 text-center col-sm-12 col-xs-12 col-padding\"><h4 style=\"margin:0;line-height:34px;\">Projects</h4></span>\n    <div class=\"col-md-2 col-sm-12 col-xs-12 col-md-offset-8 col-padding\">\n      <div style=\"margin: auto; max-width: 100px;\">\n        <button id=\"add_projects\" class=\"btn btn-brown\" ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "showNewProject", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push(">Add Project</button>\n      </div>\n    </div>\n  <table class=\"table table-hover\">\n    <thead>\n      <tr>\n        <th>Title</th>\n        <th>Author</th>\n        <th>Start Date</th>\n        <th>Publish Date</th>\n        <th>Notes</th>\n        <th>Edit</th>\n        <th>Delete</th>\n      </tr>\n    </thead>\n      <tbody>\n        ");
      stack1 = helpers['if'].call(depth0, "content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </tbody>\n  </table>\n</div>\n\n");
      stack1 = (helper = helpers['bs-modal'] || (depth0 && depth0['bs-modal']),options={hash:{
        'name': ("newProject"),
        'fade': (true),
        'footerButtonsBinding': ("newProjectModalButtons"),
        'title': ("Add a new project")
      },hashTypes:{'name': "STRING",'fade': "BOOLEAN",'footerButtonsBinding': "STRING",'title': "STRING"},hashContexts:{'name': depth0,'fade': depth0,'footerButtonsBinding': depth0,'title': depth0},inverse:self.noop,fn:self.program(13, program13, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "bs-modal", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/settings", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function", blockHelperMissing=helpers.blockHelperMissing;

    function program1(depth0,data) {
      
      
      data.buffer.push("<span class=\"glyphicon glyphicon-envelope\"></span>");
      }

    function program3(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        ");
      stack1 = helpers.each.call(depth0, {hash:{
        'itemController': ("collapse")
      },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(4, program4, data),contexts:[],types:[],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        ");
      return buffer;
      }
    function program4(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n        <tr>\n          <td>");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'type': ("checkbox"),
        'checked': ("selected")
      },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("</td>\n          <td>");
      stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n          <td>");
      stack1 = helpers._triageMustache.call(depth0, "position", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n          <td>");
      stack1 = helpers._triageMustache.call(depth0, "email", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n          <td>");
      stack1 = helpers._triageMustache.call(depth0, "phone", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n          <td>");
      stack1 = helpers._triageMustache.call(depth0, "jobs.length", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</td>\n          <td>");
      data.buffer.push(escapeExpression((helper = helpers['clean-on-empty'] || (depth0 && depth0['clean-on-empty']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "sports", options) : helperMissing.call(depth0, "clean-on-empty", "sports", options))));
      data.buffer.push("</td>\n          <td>");
      data.buffer.push(escapeExpression((helper = helpers['clean-on-empty'] || (depth0 && depth0['clean-on-empty']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "day", options) : helperMissing.call(depth0, "clean-on-empty", "day", options))));
      data.buffer.push("</td>\n          <td>");
      data.buffer.push(escapeExpression((helper = helpers['clean-on-empty'] || (depth0 && depth0['clean-on-empty']),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "backDay", options) : helperMissing.call(depth0, "clean-on-empty", "backDay", options))));
      data.buffer.push("</td>\n          <td>\n            <a style=\"text-decoration:none\" data-toggle=\"collapse\" data-parent=\"#accordion\" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'href': ("href")
      },hashTypes:{'href': "STRING"},hashContexts:{'href': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("> <span class=\"glyphicon glyphicon-list\"></span> </a>\n          </td>\n          <td>\n            <a ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "editOldDailyMember", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
      data.buffer.push(" style=\"text-decoration:none;\"><span class=\"glyphicon glyphicon-pencil\"></span></a>\n          </td>\n          <td>\n            <a ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "deleteDailyMember", "", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
      data.buffer.push(" style=\"text-decoration:none;\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n          </td>\n        </tr>\n        <tr>\n          <td colspan=\"12\" style=\"padding: 0; text-align: left\">\n            <div ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'id': ("idTag")
      },hashTypes:{'id': "STRING"},hashContexts:{'id': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(" class=\"panel-collapse collapse\">\n              <div class=\"panel-body\">\n                ");
      stack1 = helpers['if'].call(depth0, "notes", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n                <hr>\n                <label>Job History</label>\n                <div class=\"table-response\" style=\"width: 400px;\">\n                  <table class=\"table\" style=\"background-color: #FDFDFD\">\n                    <thead>\n                    </thead>\n                    <tbody>\n                    ");
      stack1 = helpers.each.call(depth0, "job", "in", "jobs", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(9, program9, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n                    </tbody>\n                  </table>\n                </div>\n              </div>\n            </div>\n          </td>\n        </tr>\n        ");
      return buffer;
      }
    function program5(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push(" ");
      stack1 = helpers._triageMustache.call(depth0, "notes", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push(" ");
      return buffer;
      }

    function program7(depth0,data) {
      
      
      data.buffer.push(" <em>No notes on this member</em> ");
      }

    function program9(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n                    <tr>\n                      <th>");
      stack1 = helpers._triageMustache.call(depth0, "job.title", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</th>\n                      <th>");
      stack1 = helpers._triageMustache.call(depth0, "job.section", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</th>\n                      <th>");
      stack1 = helpers._triageMustache.call(depth0, "job.dueDate", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("</th>\n                    </tr>\n                    ");
      return buffer;
      }

    function program11(depth0,data) {
      
      
      data.buffer.push("\n          <tr><td colspan=12><em>You need some members!</em></td></tr>\n        ");
      }

    function program13(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-title']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-title']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-title']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-title', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-body']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-body']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-body']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-body', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(17, program17, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-footer']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-footer']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-footer']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-footer', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(22, program22, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      }
    function program14(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n        ");
      stack1 = (helper = helpers['em-modal-toggler'] || (depth0 && depth0['em-modal-toggler']),options={hash:{
        'class': ("close")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},inverse:self.noop,fn:self.program(15, program15, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-toggler", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        <h4 class=\"modal-title\">Add a new daily member</h4>\n    ");
      return buffer;
      }
    function program15(depth0,data) {
      
      
      data.buffer.push("<span aria-hidden=\"true\">×</span><span class=\"sr-only\">Close</span>");
      }

    function program17(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        ");
      stack1 = helpers['if'].call(depth0, "async", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(20, program20, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      return buffer;
      }
    function program18(depth0,data) {
      
      
      data.buffer.push("\n            Submitting, please wait...\n        ");
      }

    function program20(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n          <form role=\"form\">\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-text'] || (depth0 && depth0['form-field-text']),options={hash:{
        'value': ("editMember.name"),
        'error': ("editMember.errors.name"),
        'placeholder': ("Enter his / her name..."),
        'label': ("Name")
      },hashTypes:{'value': "ID",'error': "ID",'placeholder': "STRING",'label': "STRING"},hashContexts:{'value': depth0,'error': depth0,'placeholder': depth0,'label': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-text", options))));
      data.buffer.push("\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-select'] || (depth0 && depth0['form-field-select']),options={hash:{
        'value': ("editMember.position"),
        'error': ("editMember.errors.position"),
        'content': ("positions"),
        'prompt': ("Select his / her position on the Daily..."),
        'label': ("Position")
      },hashTypes:{'value': "ID",'error': "ID",'content': "ID",'prompt': "STRING",'label': "STRING"},hashContexts:{'value': depth0,'error': depth0,'content': depth0,'prompt': depth0,'label': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-select", options))));
      data.buffer.push("\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-text'] || (depth0 && depth0['form-field-text']),options={hash:{
        'value': ("editMember.email"),
        'error': ("editMember.errors.email"),
        'placeholder': ("Enter his / her email..."),
        'label': ("Email")
      },hashTypes:{'value': "ID",'error': "ID",'placeholder': "STRING",'label': "STRING"},hashContexts:{'value': depth0,'error': depth0,'placeholder': depth0,'label': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-text", options))));
      data.buffer.push("\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-text'] || (depth0 && depth0['form-field-text']),options={hash:{
        'value': ("editMember.phone"),
        'error': ("editMember.errors.phone"),
        'placeholder': ("### ### ####"),
        'label': ("Phone")
      },hashTypes:{'value': "ID",'error': "ID",'placeholder': "STRING",'label': "STRING"},hashContexts:{'value': depth0,'error': depth0,'placeholder': depth0,'label': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-text", options))));
      data.buffer.push("\n\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-select'] || (depth0 && depth0['form-field-select']),options={hash:{
        'value': ("editMember.sports"),
        'content': ("sportsAnswers"),
        'prompt': ("Can this member shoot sports?"),
        'label': ("Sports")
      },hashTypes:{'value': "ID",'content': "ID",'prompt': "STRING",'label': "STRING"},hashContexts:{'value': depth0,'content': depth0,'prompt': depth0,'label': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-select", options))));
      data.buffer.push("\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-select'] || (depth0 && depth0['form-field-select']),options={hash:{
        'value': ("editMember.day"),
        'content': ("days"),
        'prompt': ("Choose the day this member is on call"),
        'label': ("On Call Day")
      },hashTypes:{'value': "ID",'content': "ID",'prompt': "STRING",'label': "STRING"},hashContexts:{'value': depth0,'content': depth0,'prompt': depth0,'label': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-select", options))));
      data.buffer.push("\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-select'] || (depth0 && depth0['form-field-select']),options={hash:{
        'value': ("editMember.backDay"),
        'content': ("days"),
        'prompt': ("Choose the day this member is on call"),
        'label': ("Back Up On Call Day")
      },hashTypes:{'value': "ID",'content': "ID",'prompt': "STRING",'label': "STRING"},hashContexts:{'value': depth0,'content': depth0,'prompt': depth0,'label': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-select", options))));
      data.buffer.push("\n\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-text'] || (depth0 && depth0['form-field-text']),options={hash:{
        'value': ("editMember.notes"),
        'error': ("editMember.errors.notes"),
        'placeholder': ("Enter any notes..."),
        'label': ("Notes")
      },hashTypes:{'value': "ID",'error': "ID",'placeholder': "STRING",'label': "STRING"},hashContexts:{'value': depth0,'error': depth0,'placeholder': depth0,'label': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-text", options))));
      data.buffer.push("\n          </form>\n        ");
      return buffer;
      }

    function program22(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n        <button type=\"submit\" class=\"btn btn-primary\" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'disabled': ("async")
      },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">Submit</button>\n    ");
      return buffer;
      }

    function program24(depth0,data) {
      
      var buffer = '', stack1, helper, options;
      data.buffer.push("\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-title']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-title']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-title']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-title', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(14, program14, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-body']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-body']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-body']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-body', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(25, program25, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n    ");
      options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[],types:[],data:data}
      if (helper = helpers['em-modal-footer']) { stack1 = helper.call(depth0, options); }
      else { helper = (depth0 && depth0['em-modal-footer']); stack1 = typeof helper === functionType ? helper.call(depth0, options) : helper; }
      if (!helpers['em-modal-footer']) { stack1 = blockHelperMissing.call(depth0, 'em-modal-footer', {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(28, program28, data),contexts:[],types:[],data:data}); }
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      }
    function program25(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        ");
      stack1 = helpers['if'].call(depth0, "async", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(26, program26, data),fn:self.program(18, program18, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n    ");
      return buffer;
      }
    function program26(depth0,data) {
      
      var buffer = '', helper, options;
      data.buffer.push("\n          <form role=\"form\">\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-text'] || (depth0 && depth0['form-field-text']),options={hash:{
        'value': ("email"),
        'placeholder': ("Enter an email..."),
        'readonly': (true),
        'error': ("errors.toEmail"),
        'label': ("To:")
      },hashTypes:{'value': "ID",'placeholder': "STRING",'readonly': "BOOLEAN",'error': "ID",'label': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'readonly': depth0,'error': depth0,'label': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-text", options))));
      data.buffer.push("\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-text'] || (depth0 && depth0['form-field-text']),options={hash:{
        'value': ("subject"),
        'placeholder': ("Enter an a subject line..."),
        'label': ("Subject:")
      },hashTypes:{'value': "ID",'placeholder': "STRING",'label': "STRING"},hashContexts:{'value': depth0,'placeholder': depth0,'label': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-text", options))));
      data.buffer.push("\n            ");
      data.buffer.push(escapeExpression((helper = helpers['form-field-text'] || (depth0 && depth0['form-field-text']),options={hash:{
        'value': ("body"),
        'placeholder': ("Enter an a body message..."),
        'label': ("Body:"),
        'rows': (8)
      },hashTypes:{'value': "ID",'placeholder': "STRING",'label': "STRING",'rows': "INTEGER"},hashContexts:{'value': depth0,'placeholder': depth0,'label': depth0,'rows': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "form-field-text", options))));
      data.buffer.push("\n          </form>\n        ");
      return buffer;
      }

    function program28(depth0,data) {
      
      var buffer = '';
      data.buffer.push("\n        <button type=\"submit\" class=\"btn btn-brown\" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'disabled': ("async")
      },hashTypes:{'disabled': "ID"},hashContexts:{'disabled': depth0},contexts:[],types:[],data:data})));
      data.buffer.push(">Submit</button>\n    ");
      return buffer;
      }

      data.buffer.push("<div id=\"daily_members\" class=\"table-responsive content\">\n  <span class=\"col-md-2 text-center col-sm-12 col-xs-12 col-padding\"><h4 style=\"margin:0;line-height:34px;\">Members</h4></span>\n    <div class=\"col-md-3 col-sm-12 col-xs-12 col-md-offset-7 col-padding\">\n      <div style=\"margin: auto; max-width: 187px;\">\n        ");
      stack1 = (helper = helpers['em-modal-toggler'] || (depth0 && depth0['em-modal-toggler']),options={hash:{
        'modal-id': ("mail"),
        'class': ("btn btn-brown"),
        'disabled': ("isSelectedMembers")
      },hashTypes:{'modal-id': "STRING",'class': "STRING",'disabled': "ID"},hashContexts:{'modal-id': depth0,'class': depth0,'disabled': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-toggler", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        <button class=\"btn btn-brown\" ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "showNewDailyMember", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data})));
      data.buffer.push(">Add Daily Member</button>\n      </div>\n    </div>\n  <table class=\"table table-hover\">\n    <thead>\n      <tr>\n        <th>");
      data.buffer.push(escapeExpression((helper = helpers.input || (depth0 && depth0.input),options={hash:{
        'type': ("checkbox"),
        'checked': ("selectedAll")
      },hashTypes:{'type': "STRING",'checked': "ID"},hashContexts:{'type': depth0,'checked': depth0},contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "input", options))));
      data.buffer.push("</th>\n        <th>Name</th>\n        <th>Position</th>\n        <th>Email</th>\n        <th>Phone</th>\n        <th># Assigned</th>\n        <th>Sports</th>\n        <th>On Call Day</th>\n        <th>Back Up Day</th>\n        <th>Notes</th>\n        <th>Edit</th>\n        <th>Delete</th>\n      </tr>\n    </thead>\n      <tbody>\n        ");
      stack1 = helpers['if'].call(depth0, "content", {hash:{},hashTypes:{},hashContexts:{},inverse:self.program(11, program11, data),fn:self.program(3, program3, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n      </tbody>\n  </table>\n</div>\n\n");
      stack1 = (helper = helpers['em-modal-form'] || (depth0 && depth0['em-modal-form']),options={hash:{
        'configName': ("bs"),
        'id': ("modalf"),
        'on-submit': ("createDailyMember"),
        'in-async': ("async"),
        'open-if': ("hasEditMember"),
        'close-if': ("success")
      },hashTypes:{'configName': "STRING",'id': "STRING",'on-submit': "STRING",'in-async': "ID",'open-if': "ID",'close-if': "ID"},hashContexts:{'configName': depth0,'id': depth0,'on-submit': depth0,'in-async': depth0,'open-if': depth0,'close-if': depth0},inverse:self.noop,fn:self.program(13, program13, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-form", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n\n\n");
      stack1 = (helper = helpers['em-modal-form'] || (depth0 && depth0['em-modal-form']),options={hash:{
        'configName': ("bs"),
        'id': ("mail"),
        'on-submit': ("sendMailToMembers"),
        'in-async': ("async"),
        'on-show': ("setEmails")
      },hashTypes:{'configName': "STRING",'id': "STRING",'on-submit': "STRING",'in-async': "ID",'on-show': "STRING"},hashContexts:{'configName': depth0,'id': depth0,'on-submit': depth0,'in-async': depth0,'on-show': depth0},inverse:self.noop,fn:self.program(24, program24, data),contexts:[],types:[],data:data},helper ? helper.call(depth0, options) : helperMissing.call(depth0, "em-modal-form", options));
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/templates/stock", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      var buffer = '', stack1, helper, options, escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

    function program1(depth0,data) {
      
      var buffer = '', stack1;
      data.buffer.push("\n        <th ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "toggleSort", "value", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["ID","ID"],data:data})));
      data.buffer.push(">\n          ");
      stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          ");
      stack1 = helpers['if'].call(depth0, "sortedAsc", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n          \n          ");
      stack1 = helpers['if'].call(depth0, "sortedDesc", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        </th>\n        ");
      return buffer;
      }
    function program2(depth0,data) {
      
      
      data.buffer.push("\n            <i class=\"glyphicon glyphicon-chevron-up\"></i>\n          ");
      }

    function program4(depth0,data) {
      
      
      data.buffer.push("\n            <i class=\"glyphicon glyphicon-chevron-down\"></i>\n          ");
      }

      data.buffer.push("<div class=\"content job-list\">\n  <div style=\"margin-bottom:10px;\">\n    <span class=\"col-md-2 text-center col-sm-12 col-xs-12 col-padding\"><h4 style=\"margin:0;line-height:34px;\">File Photos</h4></span>\n    <div class=\"col-md-2 col-sm-12 col-xs-12 col-md-offset-8 col-padding\">\n      <div style=\"margin: auto; max-width: 84px;\">\n        <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "showMailModal", "reject", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","STRING"],data:data})));
      data.buffer.push(" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":btn :btn-danger isSelectedJobs:disabled")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("><span class=\"glyphicon glyphicon-trash\"></span></button>\n        <button ");
      data.buffer.push(escapeExpression(helpers.action.call(depth0, "changeState", 5, {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0,depth0],types:["STRING","INTEGER"],data:data})));
      data.buffer.push(" ");
      data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
        'class': (":btn :btn-primary  isSelectedJobs:disabled")
      },hashTypes:{'class': "STRING"},hashContexts:{'class': depth0},contexts:[],types:[],data:data})));
      data.buffer.push("><span class=\"glyphicon glyphicon-tasks\"></span></button>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"table\">\n  <table class=\"table table-condensed\">\n    <thead>\n      <tr>\n        ");
      stack1 = helpers.each.call(depth0, "columns", {hash:{
        'itemController': ("columnItem")
      },hashTypes:{'itemController': "STRING"},hashContexts:{'itemController': depth0},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
      if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
      data.buffer.push("\n        <th>Edit</th>\n        <th>Details</th>\n      </tr>\n    </thead>\n      ");
      data.buffer.push(escapeExpression((helper = helpers.collection || (depth0 && depth0.collection),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "jobs-collection", options) : helperMissing.call(depth0, "collection", "jobs-collection", options))));
      data.buffer.push("\n  </table>\n  </div>\n</div>\n");
      return buffer;
      
    });
  });
define("jobs-tuftsdaily/tests/adapters/application.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - adapters');
    test('adapters/application.js should pass jshint', function() { 
      ok(true, 'adapters/application.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/app.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - .');
    test('app.js should pass jshint', function() { 
      ok(true, 'app.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/components/accordion-collapse.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - components');
    test('components/accordion-collapse.js should pass jshint', function() { 
      ok(true, 'components/accordion-collapse.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/components/form-field-select.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - components');
    test('components/form-field-select.js should pass jshint', function() { 
      ok(true, 'components/form-field-select.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/components/form-field-text.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - components');
    test('components/form-field-text.js should pass jshint', function() { 
      ok(true, 'components/form-field-text.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/controllers/archive.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/archive.js should pass jshint', function() { 
      ok(true, 'controllers/archive.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/controllers/collapse.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/collapse.js should pass jshint', function() { 
      ok(true, 'controllers/collapse.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/controllers/column-item.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/column-item.js should pass jshint', function() { 
      ok(true, 'controllers/column-item.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/controllers/index.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/index.js should pass jshint', function() { 
      ok(true, 'controllers/index.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/controllers/job-edit.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/job-edit.js should pass jshint', function() { 
      ok(true, 'controllers/job-edit.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/controllers/jobs.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/jobs.js should pass jshint', function() { 
      ok(true, 'controllers/jobs.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/controllers/projects.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/projects.js should pass jshint', function() { 
      ok(true, 'controllers/projects.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/controllers/settings.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/settings.js should pass jshint', function() { 
      ok(true, 'controllers/settings.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/controllers/stock.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - controllers');
    test('controllers/stock.js should pass jshint', function() { 
      ok(true, 'controllers/stock.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/helpers/clean-on-empty.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - helpers');
    test('helpers/clean-on-empty.js should pass jshint', function() { 
      ok(true, 'helpers/clean-on-empty.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/helpers/handlebar-helpers.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - helpers');
    test('helpers/handlebar-helpers.js should pass jshint', function() { 
      ok(true, 'helpers/handlebar-helpers.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/helpers/helper.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - helpers');
    test('helpers/helper.js should pass jshint', function() { 
      ok(true, 'helpers/helper.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/helpers/resolver", 
  ["ember/resolver","jobs-tuftsdaily/config/environment","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];
    var config = __dependency2__["default"];

    var resolver = Resolver.create();

    resolver.namespace = {
      modulePrefix: config.modulePrefix,
      podModulePrefix: config.podModulePrefix
    };

    __exports__["default"] = resolver;
  });
define("jobs-tuftsdaily/tests/helpers/start-app", 
  ["ember","jobs-tuftsdaily/app","jobs-tuftsdaily/router","jobs-tuftsdaily/config/environment","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var Application = __dependency2__["default"];
    var Router = __dependency3__["default"];
    var config = __dependency4__["default"];

    __exports__["default"] = function startApp(attrs) {
      var application;

      var attributes = Ember.merge({}, config.APP);
      attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

      Ember.run(function () {
        application = Application.create(attributes);
        application.setupForTesting();
        application.injectTestHelpers();
      });

      return application;
    }
  });
define("jobs-tuftsdaily/tests/integration/jobs-test", 
  ["ember","jobs-tuftsdaily/tests/helpers/start-app"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var startApp = __dependency2__["default"];
    var exists = __dependency2__["default"];

    var App;

    module("Integration - Jobs Page", {
      setup: function () {
        App = startApp();
      },
      teardown: function () {
        Ember.run(App, "destroy");
      }
    });

    test("Should load content", function () {
      visit("/jobs").then(function () {
        ok(true, "dummy test");
        //ok(exists("*"), "Found HTML!");
      });
    });
  });
define("jobs-tuftsdaily/tests/integration/landing-page-test", 
  ["ember","jobs-tuftsdaily/tests/helpers/start-app"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var startApp = __dependency2__["default"];
    var exists = __dependency2__["default"];

    var App;

    module("Integration - Landing Page", {
      setup: function () {
        App = startApp();
      },
      teardown: function () {
        Ember.run(App, "destroy");
      }
    });

    test("Should load content", function () {
      visit("/").then(function () {
        ok(exists("*"), "Found HTML!");
      });
    });
  });
define("jobs-tuftsdaily/tests/integration/projects-test", 
  ["ember","jobs-tuftsdaily/tests/helpers/start-app"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var startApp = __dependency2__["default"];
    var exists = __dependency2__["default"];

    var App;

    module("Integration - Projects Page", {
      setup: function () {
        App = startApp();
      },
      teardown: function () {
        Ember.run(App, "destroy");
      }
    });

    test("Should load content", function () {
      visit("/projects").then(function () {
        ok(exists("*"), "Found HTML!");
      });
    });

    //test('Should display empty project msg', function() {
    //  visit('/projects').then(function() {
    //    ok(exists('em'), "found em");
    //    ok(find('em').text() === "You need some projects!", "Empty text present!");
    //  });
    //});
    //
    //test('Should show modal', function() {
    //  visit('/projects').then(function() {
    //    click('#add_projects');
    //    ok(find('.modal').attr('style') === "display: block;", "Modal appeared");
    //  });
    //});
  });
define("jobs-tuftsdaily/tests/integration/settings-test", 
  ["ember","jobs-tuftsdaily/tests/helpers/start-app"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var startApp = __dependency2__["default"];
    var exists = __dependency2__["default"];

    var App;

    module("Integration - Settings Page", {
      setup: function () {
        App = startApp();
      },
      teardown: function () {
        Ember.run(App, "destroy");
      }
    });

    test("Should load content", function () {
      visit("/settings").then(function () {
        //ok(exists("*"), "Found HTML!");
        ok(true, "dummy test");
      });
    });
  });
define("jobs-tuftsdaily/tests/integration/stock-test", 
  ["ember","jobs-tuftsdaily/tests/helpers/start-app"],
  function(__dependency1__, __dependency2__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var startApp = __dependency2__["default"];
    var exists = __dependency2__["default"];

    var App;

    module("Integration - Stock Page", {
      setup: function () {
        App = startApp();
      },
      teardown: function () {
        Ember.run(App, "destroy");
      }
    });

    test("Should load content", function () {
      visit("/stock").then(function () {
        ok(exists("*"), "Found HTML!");
      });
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/helpers/resolver.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/helpers');
    test('jobs-tuftsdaily/tests/helpers/resolver.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/helpers/resolver.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/helpers/start-app.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/helpers');
    test('jobs-tuftsdaily/tests/helpers/start-app.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/helpers/start-app.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/integration/jobs-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/integration');
    test('jobs-tuftsdaily/tests/integration/jobs-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/integration/jobs-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/integration/landing-page-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/integration');
    test('jobs-tuftsdaily/tests/integration/landing-page-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/integration/landing-page-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/integration/projects-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/integration');
    test('jobs-tuftsdaily/tests/integration/projects-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/integration/projects-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/integration/settings-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/integration');
    test('jobs-tuftsdaily/tests/integration/settings-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/integration/settings-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/integration/stock-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/integration');
    test('jobs-tuftsdaily/tests/integration/stock-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/integration/stock-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/test-helper.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests');
    test('jobs-tuftsdaily/tests/test-helper.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/test-helper.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/controllers/archive-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/controllers');
    test('jobs-tuftsdaily/tests/unit/controllers/archive-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/controllers/archive-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/controllers/collapse-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/controllers');
    test('jobs-tuftsdaily/tests/unit/controllers/collapse-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/controllers/collapse-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/controllers/column-item-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/controllers');
    test('jobs-tuftsdaily/tests/unit/controllers/column-item-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/controllers/column-item-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/controllers/index-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/controllers');
    test('jobs-tuftsdaily/tests/unit/controllers/index-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/controllers/index-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/controllers/job-edit-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/controllers');
    test('jobs-tuftsdaily/tests/unit/controllers/job-edit-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/controllers/job-edit-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/controllers/jobs-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/controllers');
    test('jobs-tuftsdaily/tests/unit/controllers/jobs-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/controllers/jobs-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/controllers/projects-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/controllers');
    test('jobs-tuftsdaily/tests/unit/controllers/projects-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/controllers/projects-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/controllers/settings-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/controllers');
    test('jobs-tuftsdaily/tests/unit/controllers/settings-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/controllers/settings-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/controllers/stock-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/controllers');
    test('jobs-tuftsdaily/tests/unit/controllers/stock-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/controllers/stock-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/routes/application-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/routes');
    test('jobs-tuftsdaily/tests/unit/routes/application-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/routes/application-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/routes/archive-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/routes');
    test('jobs-tuftsdaily/tests/unit/routes/archive-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/routes/archive-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/routes/index-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/routes');
    test('jobs-tuftsdaily/tests/unit/routes/index-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/routes/index-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/routes/job-edit-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/routes');
    test('jobs-tuftsdaily/tests/unit/routes/job-edit-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/routes/job-edit-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/routes/jobs-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/routes');
    test('jobs-tuftsdaily/tests/unit/routes/jobs-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/routes/jobs-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/routes/mail-job-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/routes');
    test('jobs-tuftsdaily/tests/unit/routes/mail-job-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/routes/mail-job-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/routes/projects-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/routes');
    test('jobs-tuftsdaily/tests/unit/routes/projects-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/routes/projects-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/routes/settings-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/routes');
    test('jobs-tuftsdaily/tests/unit/routes/settings-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/routes/settings-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/routes/stock-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/routes');
    test('jobs-tuftsdaily/tests/unit/routes/stock-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/routes/stock-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/views/job-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/views');
    test('jobs-tuftsdaily/tests/unit/views/job-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/views/job-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/jobs-tuftsdaily/tests/unit/views/jobs-collection-test.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - jobs-tuftsdaily/tests/unit/views');
    test('jobs-tuftsdaily/tests/unit/views/jobs-collection-test.js should pass jshint', function() { 
      ok(true, 'jobs-tuftsdaily/tests/unit/views/jobs-collection-test.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/models/daily-member.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - models');
    test('models/daily-member.js should pass jshint', function() { 
      ok(true, 'models/daily-member.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/models/job.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - models');
    test('models/job.js should pass jshint', function() { 
      ok(true, 'models/job.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/models/project.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - models');
    test('models/project.js should pass jshint', function() { 
      ok(true, 'models/project.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/router.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - .');
    test('router.js should pass jshint', function() { 
      ok(true, 'router.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/routes/application.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/application.js should pass jshint', function() { 
      ok(true, 'routes/application.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/routes/archive.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/archive.js should pass jshint', function() { 
      ok(true, 'routes/archive.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/routes/index.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/index.js should pass jshint', function() { 
      ok(true, 'routes/index.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/routes/job-edit.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/job-edit.js should pass jshint', function() { 
      ok(true, 'routes/job-edit.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/routes/jobs.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/jobs.js should pass jshint', function() { 
      ok(true, 'routes/jobs.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/routes/mail-job.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/mail-job.js should pass jshint', function() { 
      ok(true, 'routes/mail-job.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/routes/projects.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/projects.js should pass jshint', function() { 
      ok(true, 'routes/projects.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/routes/settings.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/settings.js should pass jshint', function() { 
      ok(true, 'routes/settings.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/routes/stock.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - routes');
    test('routes/stock.js should pass jshint', function() { 
      ok(true, 'routes/stock.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/test-helper", 
  ["jobs-tuftsdaily/tests/helpers/resolver","ember-qunit","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var resolver = __dependency1__["default"];
    var setResolver = __dependency2__.setResolver;

    setResolver(resolver);

    document.write("<div id=\"ember-testing-container\"><div id=\"ember-testing\"></div></div>");

    QUnit.config.urlConfig.push({ id: "nocontainer", label: "Hide container" });
    var containerVisibility = QUnit.urlParams.nocontainer ? "hidden" : "visible";
    document.getElementById("ember-testing-container").style.visibility = containerVisibility;

    // TODO this is not loaded in tests
    // nice helper function
    function exists(selector) {
      return !!find(selector).length;
    }
    __exports__.exists = exists;
  });
define("jobs-tuftsdaily/tests/transforms/utc.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - transforms');
    test('transforms/utc.js should pass jshint', function() { 
      ok(true, 'transforms/utc.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/unit/controllers/archive-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("controller:archive", "ArchiveController", {});

    // Replace this with your real tests.
    test("it exists", function () {
      var controller = this.subject();
      ok(controller);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/controllers/collapse-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("controller:collapse", "CollapseController", {});

    // Replace this with your real tests.
    test("it exists", function () {
      var controller = this.subject();
      ok(controller);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/controllers/column-item-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("controller:column-item", "ColumnItemController", {});

    // Replace this with your real tests.
    test("it exists", function () {
      var controller = this.subject();
      ok(controller);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/controllers/index-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("controller:index", "IndexController", {});

    // Replace this with your real tests.
    test("it exists", function () {
      var controller = this.subject();
      ok(controller);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/controllers/job-edit-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("controller:job-edit", "JobEditController", {});

    // Replace this with your real tests.
    test("it exists", function () {
      var controller = this.subject();
      ok(controller);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/controllers/jobs-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("controller:jobs", "JobsController", {});

    // Replace this with your real tests.
    test("it exists", function () {
      var controller = this.subject();
      ok(controller);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/controllers/projects-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("controller:projects", "ProjectsController", {});

    // Replace this with your real tests.
    test("it exists", function () {
      var controller = this.subject();
      ok(controller);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/controllers/settings-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("controller:settings", "SettingsController", {});

    // Replace this with your real tests.
    test("it exists", function () {
      var controller = this.subject();
      ok(controller);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/controllers/stock-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("controller:stock", "StockController", {});

    // Replace this with your real tests.
    test("it exists", function () {
      var controller = this.subject();
      ok(controller);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/routes/application-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("route:application", "ApplicationRoute", {});

    test("it exists", function () {
      var route = this.subject();
      ok(route);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/routes/archive-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("route:archive", "ArchiveRoute", {});

    test("it exists", function () {
      var route = this.subject();
      ok(route);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/routes/index-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("route:index", "IndexRoute", {});

    test("it exists", function () {
      var route = this.subject();
      ok(route);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/routes/job-edit-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("route:job-edit", "JobEditRoute", {});

    test("it exists", function () {
      var route = this.subject();
      ok(route);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/routes/jobs-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("route:jobs", "JobsRoute", {});

    test("it exists", function () {
      var route = this.subject();
      ok(route);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/routes/mail-job-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("route:mail-job", "MailJobRoute", {});

    test("it exists", function () {
      var route = this.subject();
      ok(route);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/routes/projects-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("route:projects", "ProjectsRoute", {});

    test("it exists", function () {
      var route = this.subject();
      ok(route);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/routes/settings-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("route:settings", "SettingsRoute", {});

    test("it exists", function () {
      var route = this.subject();
      ok(route);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/routes/stock-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("route:stock", "StockRoute", {});

    test("it exists", function () {
      var route = this.subject();
      ok(route);
    });
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });
define("jobs-tuftsdaily/tests/unit/views/job-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("view:job", "JobView");

    // Replace this with your real tests.
    test("it exists", function () {
      var view = this.subject();
      ok(view);
    });
  });
define("jobs-tuftsdaily/tests/unit/views/jobs-collection-test", 
  ["ember-qunit"],
  function(__dependency1__) {
    "use strict";
    var moduleFor = __dependency1__.moduleFor;
    var test = __dependency1__.test;

    moduleFor("view:jobs-collection", "JobsCollectionView");

    // Replace this with your real tests.
    test("it exists", function () {
      var view = this.subject();
      ok(view);
    });
  });
define("jobs-tuftsdaily/tests/views/job.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - views');
    test('views/job.js should pass jshint', function() { 
      ok(true, 'views/job.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/tests/views/jobs-collection.jshint", 
  [],
  function() {
    "use strict";
    module('JSHint - views');
    test('views/jobs-collection.js should pass jshint', function() { 
      ok(true, 'views/jobs-collection.js should pass jshint.'); 
    });
  });
define("jobs-tuftsdaily/transforms/utc", 
  ["ember-data","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var DS = __dependency1__["default"];

    __exports__["default"] = DS.Transform.extend({
      serialize: function (value) {
        return value ? moment.utc(new Date(value)).format() : null;
      },
      deserialize: function (value) {
        return value ? moment.utc(value).format("YYYY-MM-DD") : null;
      }
    });
  });
define("jobs-tuftsdaily/views/job", 
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];

    var JobView = Ember.View.extend({
      templateName: "job",
      //classNameBindings: ['color'],
      color: (function () {
        var state = this.get("context.state");
        return ["info", "danger", "success", "warning", "pending", "archived"][state + 1];
      }).property("context.state"),
      id: (function () {
        return "demo" + this.get("context.id");
      }).property(),
      href: (function () {
        return "#" + this.get("id");
      }).property(),
      eventLoc: Ember.computed.alias("context.loc"),
      edit: (function () {
        return "#/job/" + this.get("context.id");
      }).property()
    });

    __exports__["default"] = JobView;
  });
define("jobs-tuftsdaily/views/jobs-collection", 
  ["ember","jobs-tuftsdaily/views/job","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"];
    var JobView = __dependency2__["default"];

    __exports__["default"] = Ember.CollectionView.extend({
      tagName: "tbody",
      content: (function () {
        return this.get("controller.filteredJobs");
      }).property("controller.filteredJobs"), //Ember.computed.alias('controller.filteredJobs'),
      itemViewClass: JobView,
      emptyView: Ember.View.extend({
        template: Ember.Handlebars.compile("<tbody><tr><td colspan=12><em>You need some jobs!</em></td></tr></tbody>")
      })
    });
  });
/* jshint ignore:start */

define('jobs-tuftsdaily/config/environment', ['ember'], function(Ember) {
  var prefix = 'jobs-tuftsdaily';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("jobs-tuftsdaily/tests/test-helper");
} else {
  require("jobs-tuftsdaily/app")["default"].create({});
}

/* jshint ignore:end */
//# sourceMappingURL=jobs-tuftsdaily.map