require 'archive'

namespace :recurring do
  desc 'Initializes all run time systems'
  task init: :environment do
    # Delete any previously-scheduled recurring jobs
    Delayed::Job.where('(handler LIKE ?)', '--- !ruby/object:Recurring::%').destroy_all

    Delayed::Worker.logger = Logger.new(File.join(Rails.root, 'log', 'delayed_job.log'))
    Archive::schedule
  end
end
