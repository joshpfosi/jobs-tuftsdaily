class MailJobController < ApplicationController
  respond_to :json
  
  def create
    data = params
    AutoMailer.mail_job(data).deliver
    render json: "ok", status: 204
  end
end
