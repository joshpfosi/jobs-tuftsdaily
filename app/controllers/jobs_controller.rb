class JobsController < ApplicationController
  # GET /jobs/:id
  def show
    @job = Job.find(params[:id])

    respond_to do |format|
      format.json { render json: @job }
    end
  end

  # GET /jobs
  def index
    @jobs = Job.all
    
    respond_to do |format|
      format.json { render json: @jobs }
    end
  end

  # POST /jobs
  def create
    @job = Job.new(job_params)

    respond_to do |format|
      if @job.save
        format.json { render json: @job, status: :created }
      else
        format.json { render json: @job.errors, status: :unprocessable_entity }
      end
    end
  end

  # note Unpermitted parameters: :daily_member_ids
  def job_params
    params.require(:job).permit(:id, :timestamp, :title, :full_name, :email, :phone, :contact, :section, :coverage_type, :due_date, :due_time, :details, :state, :loc, :date, :time)
  end
end
