require "rails_helper"

describe AutoMailer do
  include Rails.application.routes.url_helpers

  context ".job_assign" do
    before(:all) do
      @job     = FactoryGirl.create :assigned_job
      @email   = Faker::Internet.email
      @subject = "Tufts Daily Photo Assignment: #{@job.coverage_type} on #{@job.due_date} @ #{@job.time}"
      @assignment_mailer = AutoMailer.job_assign(@email, @subject, @job)
    end

    it "should be set to be delivered to the user from the assignment passed in" do
      expect(@assignment_mailer).to deliver_to(@email)
    end

    it "should be set to be send from dailyphoto@gmail.com" do
      expect(@assignment_mailer).to deliver_from('dailyphoto@gmail.com')
    end

    it "should contain the message in the mail body" do
      expect(@assignment_mailer).to have_body_text(/Dear #{DailyMember.first.name},/)
    end

    it "should have the correct subject" do
      expect(@assignment_mailer).to have_subject(@subject)
    end
  end

  context ".job_reject" do
    before(:all) do
      @job     = FactoryGirl.create :rejected_job
      @email   = Faker::Internet.email
      @name    = Faker::Name.first_name
      @subject = "Your request for #{@job[:coverage_type]} needs more detail"
      @assignment_mailer = AutoMailer.job_reject(@email, @subject, @job)
    end

    it "should be set to be delivered to the user from the assignment passed in" do
      expect(@assignment_mailer).to deliver_to(@email)
    end

    it "should be set to be send from dailyphoto@gmail.com" do
      expect(@assignment_mailer).to deliver_from('dailyphoto@gmail.com')
    end

    it "should contain the message in the mail body" do
      expect(@assignment_mailer).to have_body_text(/#{@job[:reason]}/)
    end

    it "should have the correct subject" do
      expect(@assignment_mailer).to have_subject("Your request for #{@job.coverage_type} needs more detail")
    end
  end

  context ".mail_members" do
    before(:all) do
      @email   = Faker::Internet.email
      @subject = "Test Subject"
      @body    = "Test Body"
      @assignment_mailer = AutoMailer.mail_members(@email, @subject, @body)
    end

    it "should be set to be delivered to the user from the data passed in" do
      expect(@assignment_mailer).to deliver_to(@email)
    end

    it "should be set to be send from dailyphoto@gmail.com" do
      expect(@assignment_mailer).to deliver_from('dailyphoto@gmail.com')
    end

    it "should contain the message in the mail body" do
      expect(@assignment_mailer).to have_body_text(/Test Body/)
    end

    it "should have the correct subject" do
      expect(@assignment_mailer).to have_subject("Test Subject")
    end
  end

  context ".mail_job" do
    before(:all) do
      @email             = Faker::Internet.email
      @job               = FactoryGirl.create :job
      @assignment_mailer = AutoMailer.mail_job(@email, @job)
    end

    it "should be set to be delivered to the user from the data passed in" do
      expect(@assignment_mailer).to deliver_to(@email)
    end

    it "should be set to be send from dailyphoto@gmail.com" do
      expect(@assignment_mailer).to deliver_from('dailyphoto@gmail.com')
    end

    it "should contain the message in the mail body" do
      expect(@assignment_mailer).to have_body_text(/Successfully added or updated job: #{@job.title}/)
    end

    it "should have the correct subject" do
      expect(@assignment_mailer).to have_subject("New or updated job")
    end
  end
end
