require 'rails_helper'
require 'support/controller_helper'

RSpec.describe Api::MailJobController, :type => :controller do
  context "GET #create" do
    context "when assigning" do
      before(:each) do
        @job     = FactoryGirl.create :assigned_job
        @email   = Faker::Internet.email
        @subject = "Tufts Daily Photo Assignment: #{@job.coverage_type} on #{@job.due_date} @ #{@job.time}"

        post :create, type: 'assign', email: @email, subject: @subject, id: @job.id
      end
      
      it { should respond_with 204 }
    end
  end
end
