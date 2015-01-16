require 'rails_helper'
require 'support/controller_helper'

RSpec.describe Api::DailyMembersController, :type => :controller do
  before(:each) { sign_in }

  context "GET #index" do
    before(:each) do
      4.times { FactoryGirl.create :daily_member }
      get :index
    end

    it "returns 4 records from the database" do
      daily_members_response = json_response
      expect(daily_members_response[:daily_members].length).to eql 4
    end

    it { should respond_with 200 }
  end

  context "GET #show" do
    before(:each) do
      @daily_member = FactoryGirl.create(:daily_member)
      get :show, id: @daily_member.id
    end

    it "returns the information about a daily_member on a hash" do
      daily_member_response = json_response
      expect(daily_member_response[:daily_member][:email]).to eql @daily_member.email
    end

    it { should respond_with 200 }
  end

  context 'POST #create' do
    context 'when is successfully created' do
      before(:each) do
        @daily_member_attributes = FactoryGirl.attributes_for :daily_member
        post :create, daily_member: @daily_member_attributes
      end

      it "renders the json representation for the daily_member record just created" do
        daily_member_response = json_response
        expect(daily_member_response[:daily_member][:email]).to eql @daily_member_attributes[:email]
      end

      it { should respond_with 201 }
    end

    context "when is not created" do
      before(:each) do
        @invalid_daily_member_attributes = FactoryGirl.attributes_for :daily_member
        @invalid_daily_member_attributes[:email] = ''
        post :create, daily_member: @invalid_daily_member_attributes
      end

      it "renders an errors json" do
        daily_member_response = json_response
        expect(daily_member_response).to have_key(:errors)
      end

      it "renders the json errors on why the daily_member could not be created" do
        daily_member_response = json_response
        expect(daily_member_response[:errors][:email]).to include "is invalid"
      end

      it { should respond_with 422 }
    end
  end

  context "PUT/PATCH #update" do

    context "when is successfully updated" do
      before(:each) do
        @daily_member = FactoryGirl.create :daily_member
        patch :update, id: @daily_member.id, daily_member: { email: "newmail@example.com" }
      end

      it { should respond_with 204 }
    end

    context "when is not created" do
      before(:each) do
        @daily_member = FactoryGirl.create :daily_member
        patch :update, id: @daily_member.id,
          daily_member: { email: "bademail.com" }
      end

      it "renders an errors json" do
        daily_member_response = json_response
        expect(daily_member_response).to have_key(:errors)
      end

      it "renders the json errors on why the daily_member could not be created" do
        daily_member_response = json_response
        expect(daily_member_response[:errors][:email]).to include "is invalid"
      end

      it { should respond_with 422 }
    end
  end

  describe "DELETE #destroy" do
    before(:each) do
      @daily_member = FactoryGirl.create :daily_member
      delete :destroy, id: @daily_member.id
    end

    it { should respond_with 204 }

  end
end
