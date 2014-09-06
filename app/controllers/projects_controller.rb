class ProjectsController < ApplicationController
  before_filter :authenticate_user!

  # GET /projects/:id
  def show
    @project = Project.find(params[:id])

    respond_to do |format|
      format.json { render json: @project }
    end
  end

  # GET /projects
  def index
    @projects = Project.all
    
    respond_to do |format|
      format.json { render json: @projects }
    end
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    respond_to do |format|
      if @project.save
        format.json { render json: @project, status: :created }
      else
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /projects/:id
  def update
    @project = Project.find(params[:id])

    respond_to do |format|
      if @project.update(project_params)
        format.json { render json: nil, status: :ok }
      else
        format.json { render json: @project.errors, status: :unprocessable_entity}
      end
    end
  end

  # DELETE /projects/:id.json
  def destroy
    @project = Project.find(params[:id])
    @project.destroy

    respond_to do |format|
      format.json { render json: nil, status: :ok }
    end
  end

  def project_params
    params.require(:project).permit(:id, :title, :author, :start_date, :publish_date, :notes)
  end
end
