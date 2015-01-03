require 'archive'
namespace :archive do
  desc "Archives all jobs with publish date less than current date"
  task :archive_jobs => :environment do
    Archive.schedule! # schedule recurring job defined in lib/archive.rb
  end
end
