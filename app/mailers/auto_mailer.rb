class AutoMailer < ActionMailer::Base
  default from: "dailyphoto@gmail.com"

  def mail_job(data)
    @email          = data[:email]
    @subject        = data[:subject]
    @body           = data[:body]
    mail(to: @email, subject: @subject)
  end
end
