class AutoMailer < ActionMailer::Base
  default from: "dailyphoto@gmail.com"

  def mail_job(data)
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
end
