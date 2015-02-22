class AutoMailer < ActionMailer::Base
  default from: "dailyphoto@gmail.com"

  # type : string denoting mail type
  # data : ids of relevant records

  def job_assign(email, subject, job)
    @job = job
    mail(to: email, subject: subject)
  end

  def job_reject(email, subject, job)
    @job    = job
    @reason = job.reason
    mail(to: email, subject: subject)
  end

  def mail_members(email, subject, body)
    @body = body
    mail(to: email, subject: subject)
  end

  def mail_job(email, job)
    @job = job
    mail(to: email, subject: "New or updated job")
  end
end
