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

  # PUT /daily_members/:id
  def update
    @daily_member = DailyMember.find(params[:id])

    respond_to do |format|
      if @daily_member.update(daily_member_params)
        format.json { render json: nil, status: :ok }
      else
        format.json { render json: @daily_member.errors, status: :unprocessable_entity}
      end
    end
  end

  # DELETE /daily_members/:id.json
  def destroy
    @daily_member = DailyMember.find(params[:id])
    @daily_member.destroy

    respond_to do |format|
      format.json { render json: nil, status: :ok }
    end
  end

  def daily_member_params
    params.require(:daily_member).permit(:id, :name, :position, :email, :phone)
  end
end
