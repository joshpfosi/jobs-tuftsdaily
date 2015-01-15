class Archive
  include Delayed::RecurringJob
  run_every 1.day
  run_at '4:00am'

  def perform
    Delayed::Worker.logger.debug("RUNNING JOB at #{Time.now}")
    Job.select{|j| j.state != 6}.each do |job|

      # archive the job
      if job.publish_date < Time.now
        job.state = 6
        job.save(validate: false)
        # must validate: false, as we are updating a record in the past

        Delayed::Worker.logger.debug("Job #{job.id} archived with #{Time.now} > #{job.publish_date}")
      end
    end
  end
end
