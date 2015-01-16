require 'rails_helper'
require 'support/controller_helper'
require 'archive'

RSpec.describe Archive do
  let(:archive) { Archive.new }
  before(:each) do
    @past_jobs = []
    @future_jobs = []
    4.times do
      job = FactoryGirl.build :job
      job.publish_date = Faker::Time.backward(30)
      job.save(validate: false)
      @past_jobs << job

      @future_jobs << FactoryGirl.create(:job)
      @future_jobs << FactoryGirl.create(:job)
      archive.perform
    end
  end

  it 'archives past jobs' do
    jobs = Job.select { |job| job.state == 6 }
    expect(jobs.sort).to eql @past_jobs.sort
    expect(jobs.count).to eql 4
  end

  it 'does not archive future jobs' do
    jobs = Job.select { |job| job.state != 6 }
    expect(jobs.sort).to eql @future_jobs.sort
    expect(jobs.count).to eql 8
  end

end
