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
end
