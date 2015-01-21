class AutoMailer < ActionMailer::Base
  default from: "dailyphoto@gmail.com"

  def mail_job_assign(data)
    @title         = data[:title]
    @email         = data[:email]
    @subject       = data[:subject]
    @name          = data[:name]
    @coverage_type = data[:coverage_type]
    @contact       = data[:contact]
    @deadline      = data[:deadline]
    @location      = data[:loc]
    @time          = data[:time]
    @date          = data[:date]
    @details       = data[:details]
    mail(to: @email, subject: @subject)
  end

  def mail_job_reject(data)
    @email         = data[:email]
    @subject       = data[:subject]
    @name          = data[:name]
    @coverage_type = data[:coverage_type]
    @title         = data[:title]
    @deadline      = data[:deadline]
    @timestamp     = data[:timestamp]
    @details       = data[:details]
    @reason        = data[:reason]
    @id            = data[:id]
    mail(to: @email, subject: @subject)
  end

  def mail_job_members(data)
    @email   = data[:email]
    @subject = data[:subject]
    @body    = data[:body]
    mail(to: @email, subject: @subject)
  end

  def mail_job(job, email)
    @title   = job[:title]
    @id      = job[:id]
    @subject = "New or updated job"
    mail(to: email, subject: @subject)
  end
end
