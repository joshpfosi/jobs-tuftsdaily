require 'rails_helper'
require 'support/controller_helper'

RSpec.describe ProjectsController, :type => :controller do
  before(:each) { sign_in }

  context "GET #index" do
    before(:each) do
      4.times { FactoryGirl.create :project }
      get :index
    end

    it "returns 4 records from the database" do
      projects_response = json_response
      expect(projects_response[:projects].length).to eql 4
    end

    it { should respond_with 200 }
  end

  context "GET #show" do
    before(:each) do
      @project = FactoryGirl.create(:project)
      get :show, id: @project.id
    end

    it "returns the information about a project on a hash" do
      project_response = json_response
      expect(project_response[:project][:title]).to eql @project.title
    end

    it { should respond_with 200 }
  end

  context 'POST #create' do
    context 'when is successfully created' do
      before(:each) do
        @project_attributes = FactoryGirl.attributes_for :project
        post :create, project: @project_attributes
      end

      it "renders the json representation for the project record just created" do
        project_response = json_response
        expect(project_response[:project][:title]).to eql @project_attributes[:title]
      end

      it { should respond_with 201 }
    end
  end

  context "PUT/PATCH #update" do

    context "when is successfully updated" do
      before(:each) do
        @project = FactoryGirl.create :project
        patch :update, id: @project.id, project: { title: "newmail@example.com" }
      end

      it { should respond_with 204 }
    end
  end

  describe "DELETE #destroy" do
    before(:each) do
      @project = FactoryGirl.create :project
      delete :destroy, id: @project.id
    end

    it { should respond_with 204 }

  end
end
