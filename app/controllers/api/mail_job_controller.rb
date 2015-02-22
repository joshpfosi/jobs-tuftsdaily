class Api::MailJobController < ApplicationController
  respond_to :json
  
  # Arguments: type of mail and data
  def create
    job_type = params[:type]
    email    = params[:email]
    subject  = params[:subject]
    job      = Job.find(params[:id]) unless params[:id].nil?

    if job_type == 'assign'
      AutoMailer.job_assign(email, subject, job).deliver_later
    elsif job_type == 'reject'
      AutoMailer.job_reject(email, subject, job).deliver_later
    elsif job_type == 'members'
      AutoMailer.mail_members(email, subject, params[:body]).deliver_later
    elsif job_type == 'job'
      AutoMailer.mail_job("npfosi@gmail.com", job).deliver_later
      AutoMailer.mail_job(email, job).deliver_later
    elsif job_type == 'update_job'
      AutoMailer.mail_job("npfosi@gmail.com", job).deliver_later
    end

    render json: "ok", status: 204
  end
end
