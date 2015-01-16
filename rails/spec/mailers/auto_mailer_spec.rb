require "rails_helper"

describe AutoMailer do
   include Rails.application.routes.url_helpers

  context ".mail_job_assign" do
    before(:all) do
      @job = FactoryGirl.create :job
      @email = Faker::Internet.email
      @name  = Faker::Name.first_name
      @assignment = { title: @job[:title],
                      email: @email,
                      name: @name,
                      coverage_type: @job[:coverage_type],
                      contact: @job[:contact],
                      deadline: @job[:due_date],
                      location: @job[:loc],
                      time: @job[:time],
                      date: @job[:date],
                      details: @job[:details],
                      subject: "Tufts Daily Photo Assignment: #{@job.coverage_type} due on #{@job.due_date}"
      }
      @assignment_mailer = AutoMailer.mail_job_assign(@assignment)
    end

    it "should be set to be delivered to the user from the assignment passed in" do
      expect(@assignment_mailer).to deliver_to(@email)
    end

    it "should be set to be send from dailyphoto@gmail.com" do
      expect(@assignment_mailer).to deliver_from('dailyphoto@gmail.com')
    end

    it "should contain the message in the mail body" do
      expect(@assignment_mailer).to have_body_text(/Dear #{@name},/)
    end

    it "should have the correct subject" do
      expect(@assignment_mailer).to have_subject("Tufts Daily Photo Assignment: #{@job.coverage_type} due on #{@job.due_date}")
    end
  end

  context ".mail_job_reject" do
    before(:all) do
      @job = FactoryGirl.create :job
      @email = Faker::Internet.email
      @name  = Faker::Name.first_name
      @assignment = { title: @job[:title],
                      email: @email,
                      name: @name,
                      coverage_type: @job[:coverage_type],
                      deadline: @job[:due_date],
                      details: @job[:details],
                      reason: "Test Reason is ...",
                      id: @job.id,
                      subject: "Your request for #{@job[:coverage_type]} needs more detail"
      }
      @assignment_mailer = AutoMailer.mail_job_reject(@assignment)
    end

    it "should be set to be delivered to the user from the assignment passed in" do
      expect(@assignment_mailer).to deliver_to(@email)
    end

    it "should be set to be send from dailyphoto@gmail.com" do
      expect(@assignment_mailer).to deliver_from('dailyphoto@gmail.com')
    end

    it "should contain the message in the mail body" do
      expect(@assignment_mailer).to have_body_text(/#{@assignment[:reason]}/)
    end

    it "should have the correct subject" do
      expect(@assignment_mailer).to have_subject("Your request for #{@job.coverage_type} needs more detail")
    end
  end

  context ".mail_job_members" do
    before(:all) do
      @data = {
        email: Faker::Internet.email,
        subject: "Test Subject",
        body: "Test Body"
      }
      @assignment_mailer = AutoMailer.mail_job_members(@data)
    end

    it "should be set to be delivered to the user from the data passed in" do
      expect(@assignment_mailer).to deliver_to(@data[:email])
    end

    it "should be set to be send from dailyphoto@gmail.com" do
      expect(@assignment_mailer).to deliver_from('dailyphoto@gmail.com')
    end

    it "should contain the message in the mail body" do
      expect(@assignment_mailer).to have_body_text("Test Body")
    end

    it "should have the correct subject" do
      expect(@assignment_mailer).to have_subject("Test Subject")
    end
  end

  context ".mail_job" do
    before(:all) do
      @email = Faker::Internet.email
      @title = Faker::App.name
      @id    = 5
      @data = { job: { title: @title, id: @id }, editor_email: "joshpfosi@gmail.com" }
      @assignment_mailer = AutoMailer.mail_job(@data, @email)
    end

    it "should be set to be delivered to the user from the data passed in" do
      expect(@assignment_mailer).to deliver_to(@email)
    end

    it "should be set to be send from dailyphoto@gmail.com" do
      expect(@assignment_mailer).to deliver_from('dailyphoto@gmail.com')
    end

    it "should contain the message in the mail body" do
      expect(@assignment_mailer).to have_body_text("Successfully added or updated job: #{@title} (##{@id}). Check the jobs to see the new information.")
    end

    it "should have the correct subject" do
      expect(@assignment_mailer).to have_subject("New or updated job")
    end
  end
end
