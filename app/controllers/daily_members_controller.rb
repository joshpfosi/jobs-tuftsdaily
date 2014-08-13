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

  # POST /daily_members
  def create
    @daily_member = DailyMember.new(daily_member_params)

    respond_to do |format|
      if @daily_member.save
        format.json { render json: @daily_member, status: :created }
      else
        format.json { render json: @daily_member.errors, status: :unprocessable_entity }
      end
    end
  end
end
