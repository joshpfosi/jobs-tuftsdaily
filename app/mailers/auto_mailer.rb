class AutoMailer < ActionMailer::Base
  default from: "dailyphoto@gmail.com"

  def mail_job_assign(data)
    @email         = data[:email]
    @subject       = data[:subject]
    @name          = data[:name]
    @coverage_type = data[:coverage_type]
    @contact       = data[:contact]
    @deadline      = data[:deadline]
    @location      = data[:loc]
    @time          = data[:time]
    @details       = data[:details]
    mail(to: @email, subject: @subject)
  end

  def mail_job_reject(data)
    @email         = data[:email]
    @subject       = data[:subject]
    @name          = data[:name]
    @coverage_type = data[:coverage_type]
    @deadline      = data[:deadline]
    @timestamp     = data[:timestamp]
    @details       = data[:details]
    @reason        = data[:reason]
    mail(to: @email, subject: @subject)
  end
end
