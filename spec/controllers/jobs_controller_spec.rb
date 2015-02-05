require 'rails_helper'
require 'support/controller_helper'

RSpec.describe Api::JobsController, :type => :controller do

  context "GET #index" do
    context 'when user authenticated' do
      #before(:each) { sign_in }

      context 'when filter by nothing' do
        before do
          @job1 = FactoryGirl.create :job
          @job2 = FactoryGirl.create :job
          @job3 = FactoryGirl.create :job
          get :index
          @jobs_response = json_response[:jobs]
        end

        it 'returns all records' do
          expect(@jobs_response.length).to eql 3
        end

        it 'returns correct products' do
          expect(Job.all).to match_array([@job1,@job2,@job3])
        end
      end

      context 'when filtering' do
        before(:each) do
          @job1 = FactoryGirl.create(:job, state: 6)
          @job2 = FactoryGirl.create(:job, state: 4)
          @job3 = FactoryGirl.create(:job, state: 6)
        end

        it 'returns archived if state == 6' do
          expect(Job.search({equal_state: 6})).to match_array([@job1, @job3])
        end

        it 'returns unarchived if state != 6' do
          expect(Job.search({not_equal_state: 6})).to match_array([@job2])
        end
      end
    end
  end

  context "GET #show" do
    before(:each) do
      @job = FactoryGirl.create(:job)
      get :show, id: @job.id
    end

    it "returns the information about a job on a hash" do
      job_response = json_response
      expect(job_response[:job][:email]).to eql @job.email
    end

    it { should respond_with 200 }
  end

  context 'POST #create' do
    context 'when is successfully created' do
      before(:each) do
        @job_attributes = FactoryGirl.attributes_for :job
        post :create, job: @job_attributes
      end

      it "renders the json representation for the job record just created" do
        job_response = json_response
        expect(job_response[:job][:email]).to eql @job_attributes[:email]
      end

      it { should respond_with 201 }
    end

    context "when is not created" do
      before(:each) do
        @invalid_job_attributes = FactoryGirl.attributes_for :job
        @invalid_job_attributes[:email] = ''
        post :create, job: @invalid_job_attributes
      end

      it "renders an errors json" do
        job_response = json_response
        expect(job_response).to have_key(:errors)
      end

      it "renders the json errors on why the job could not be created" do
        job_response = json_response
        expect(job_response[:errors][:email]).to include "is invalid"
      end

      it { should respond_with 422 }
    end
  end

  context "PUT/PATCH #update" do

    context "when is successfully updated" do
      before(:each) do
        @job = FactoryGirl.create :job
        patch :update, id: @job.id, job: { email: "newmail@example.com" }
      end

      it { should respond_with 204 }
    end

    context "when is not created" do
      before(:each) do
        @job = FactoryGirl.create :job
        patch :update, id: @job.id,
          job: { email: "bademail.com" }
      end

      it "renders an errors json" do
        job_response = json_response
        expect(job_response).to have_key(:errors)
      end

      it "renders the json errors on why the job could not be created" do
        job_response = json_response
        expect(job_response[:errors][:email]).to include "is invalid"
      end

      it { should respond_with 422 }
    end
  end

  describe "DELETE #destroy" do
    before(:each) do
      @job = FactoryGirl.create :job
      #sign_in # only method that requires auth
      delete :destroy, id: @job.id
    end

    it { should respond_with 204 }

  end
end
