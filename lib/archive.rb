class Archive
  include Delayed::RecurringJob
  run_every 1.day
  run_at '4:00am'

  def perform
    Job.select{|j| j.state != 6}.each do |job|
      time = job.publish_date.split('-')
      time = Time.new(time[0], time[1], time[2])

      # archive the job
      if Time.now - time > 0
        job.state = 6
        job.save

        Delayed::Worker.logger.debug("Job #{job.id} archived with #{Time.now} - #{time} > 0")
      end
    end
  end
end
