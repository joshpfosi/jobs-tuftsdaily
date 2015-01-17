class Api::ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  #before_filter :authenticate_user!

  respond_to :json

  # GET /projects
  def index
    @projects = Project.all

    respond_with(@projects)
  end

  # GET /projects/1
  def show
    respond_with(@project)
  end

  # POST /projects
  def create
    @project = Project.new(project_params)
    @project.save
    respond_with :api, @project
  end

  # PUT /projects/:id
  def update
    @project.update(project_params)
    respond_with(@project)
  end

  # DELETE /projects/:id.json
  def destroy
    @project.destroy
    respond_with(@project)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(:id, :title, :author, :start_date, :publish_date, :notes)
    end
end
