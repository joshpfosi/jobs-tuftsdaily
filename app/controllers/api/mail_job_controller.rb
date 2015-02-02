class Api::MailJobController < ApplicationController
  respond_to :json
  
  def create
    data = params
    if params[:type] == 'assign'
      AutoMailer.mail_job_assign(data).deliver_now
    elsif params[:type] == 'reject'
      AutoMailer.mail_job_reject(data).deliver_now
    elsif params[:type] == 'members'
      AutoMailer.mail_job_members(data).deliver_now
    elsif params[:type] == 'job'
      AutoMailer.mail_job(data[:job], "npfosi@gmail.com").deliver_now
      AutoMailer.mail_job(data[:job], data[:editorEmail]).deliver_now
    elsif params[:type] == 'update_job'
      AutoMailer.mail_job(data, "npfosi@gmail.com").deliver_now
    end
    render json: "ok", status: 204
  end
end
