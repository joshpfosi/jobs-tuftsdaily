class Api::JobsController < ApplicationController
  before_action :set_job, only: [:show, :edit, :update, :destroy]
  #before_filter :authenticate_user!, except: [:create, :show, :update]

  respond_to :json

  # GET /jobs
  def index
    respond_with(Job.search(params))
  end

  # GET /jobs/:id
  def show
    respond_with(@job)
  end

  # POST /jobs
  def create
    @job = Job.new(job_params)
    @job.save
    respond_with :api, @job
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

    def job_params
      params.require(:job).permit(:id, :created_at, :timestamp, :title, :full_name, :email, :phone, :contact, :section, :coverage_type, :publish_date, :due_date, :details, :state, :loc, :date, :time, :reason, :daily_member_id)
    end
end
