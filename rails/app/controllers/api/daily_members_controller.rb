class Api::DailyMembersController < ApplicationController
  before_action :set_daily_member, only: [:show, :edit, :update, :destroy]
  #before_filter :authenticate_user!

  respond_to :json

  # GET /daily_members
  def index
    @daily_members = DailyMember.all
    respond_with(@daily_members)
  end

  # GET /daily_members/:id
  def show
    respond_with(@daily_member)
  end

  # POST /daily_members
  def create
    @daily_member = DailyMember.new(daily_member_params)
    @daily_member.save
    respond_with :api, @daily_member
  end

  # PUT /daily_members/:id
  def update
    @daily_member.update(daily_member_params)
    respond_with(@daily_member)
  end

  # DELETE /daily_members/:id.json
  def destroy
    @daily_member.destroy
    respond_with(@daily_member)
  end

  private
    def set_daily_member
      @daily_member = DailyMember.find(params[:id])
    end

    def daily_member_params
      params.require(:daily_member).permit(:id, :name, :position, :email, :phone, :day, :back_day, :sports, :notes)
    end
end
