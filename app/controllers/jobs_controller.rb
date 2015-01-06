class JobsController < ApplicationController
  before_action :set_job, only: [:show, :edit, :update, :destroy]
  before_filter :authenticate_user!, except: [:create, :show, :update]

  respond_to :json

  # GET /jobs
  def index
    if params[:state] == 'archived'
      @jobs = Job.select{ |job| job.state == 6 }
    elsif params[:state] == 'unarchived'
      @jobs = Job.select{ |job| job.state != 6 }
    elsif params[:coverageType] == 'stock'
      @jobs = Job.select{ |job| job.state != 6 && (job.coverage_type == 'File Photo' || job.coverage_type == 'Stock') }
    end
    
    respond_with(@jobs)
  end


  # GET /jobs/:id
  def show
    respond_with(@job)
  end

  # POST /jobs
  def create
    @job = Job.new(job_params)
    @job.save
    respond_with(@job)
  end

  # PUT /jobs/:id
  def update
    @job.update(job_params)
    respond_with(@job)
  end

  def destroy
    @job.destroy
    respond_with(@job)
  end

  private
    def set_job
      @job = Job.find(params[:id])
    end

    # note Unpermitted parameters: :daily_member_ids
    def job_params
      params.require(:job).permit(:id, :timestamp, :title, :full_name, :email, :phone, :contact, :section, :coverage_type, :publish_date, :due_date, :details, :state, :loc, :date, :time, :daily_member_id)
    end
end
