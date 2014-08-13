class DailyMembersController < ApplicationController
  # GET /daily_members/:id
  def show
    @daily_member = DailyMember.find(params[:id])

    respond_to do |format|
      format.json { render json: @daily_member }
    end
  end

  # GET /daily_members
  def index
    @daily_members = DailyMember.all
    
    respond_to do |format|
      format.json { render json: @daily_members }
    end
  end
end
