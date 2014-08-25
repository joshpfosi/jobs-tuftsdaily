class MailJobController < ApplicationController
  respond_to :json
  
  def create
    data = params
    if params[:type] == 'assign'
      AutoMailer.mail_job_assign(data).deliver
    elsif params[:type] == 'reject'
      AutoMailer.mail_job_reject(data).deliver
    else
      AutoMailer.mail_job(data[:job]).deliver
    end
    render json: "ok", status: 204
  end
end
