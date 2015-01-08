# when launched with rake, RAILS_ENV is nil
if ENV["RAILS_ENV"].present? && ENV["RAILS_ENV"] != "test"
  require 'archive'
  Delayed::Worker.logger = Logger.new(File.join(Rails.root, 'log', 'delayed_job.log'))

  # schedule recurring jobs
  Archive.schedule! # schedule recurring job defined in lib/archive.rb
end
