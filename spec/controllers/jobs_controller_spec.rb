require 'rails_helper'
require 'support/controller_helper'

RSpec.describe JobsController, :type => :controller do

  context "GET #index" do
    context 'authenticated' do
      before(:each) { sign_in }

      it "returns nothing without query" do
        4.times { FactoryGirl.create :job }
        get :index
        jobs_response = json_response
        expect(jobs_response[:jobs].length).to eql 4
        should respond_with 200
      end

      it "returns archived with query" do
        4.times { FactoryGirl.create(:job, state: 6) }
        get :index, state: 'archived'
        jobs_response = json_response
        expect(jobs_response[:jobs].length).to eql 4
        should respond_with 200
      end

      it "returns unarchived with query" do
        4.times { FactoryGirl.create(:job, state: 4) }
        get :index, state: 'unarchived'
        jobs_response = json_response
        expect(jobs_response[:jobs].length).to eql 4
        should respond_with 200
      end

      it "returns stock with query" do
        4.times { FactoryGirl.create(:job, state: 4, coverage_type: "Stock") }
        get :index, coverageType: 'stock'
        jobs_response = json_response
        expect(jobs_response[:jobs].length).to eql 4
        should respond_with 200
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
      sign_in # only method that requires auth
      delete :destroy, id: @job.id
    end

    it { should respond_with 204 }

  end

  #context 'GET #index' do
  #  it 'error if unauthenticated' do
  #    get :index
  #    expect(response).to have_http_status(401)
  #  end

  #  context 'authenticted' do
  #    before(:each) do
  #      sign_in
  #    end

  #    it 'assigns nil iff authenticated and no query' do
  #      get :index
  #      expect(response).to have_http_status(200)
  #    end

  #    it 'returns only archives w/ state == archived' do
  #      get :index, state: 'archived'
  #      expect(response).to have_http_status(200)

  #      #expected_jobs = [@job1,@job5].map{ |job| job.to_json }
  #      #expect(response.body).to eq(expected_jobs)
  #    end

  #    it 'returns only unarchived w/ state == unarchived'
  #    it 'returns only stock w/ state == stock'
  #  end
  #end
end
