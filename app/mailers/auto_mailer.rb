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
    @id            = data[:id]
    mail(to: @email, subject: @subject)
  end

  def mail_job(data)
    puts "================================================================="
    puts data
    puts "llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll"
    @title   = data[:title]
    puts @title
    @id      = data[:id]
    @subject = "New or updated job"
    mail(to: "npfosi@gmail.com", subject: @subject)
  end
end
