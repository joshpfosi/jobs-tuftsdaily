require 'rails_helper'

RSpec.describe Job, :type => :model do
  before { @job = FactoryGirl.create(:job) }

  subject { @job }

  it { should respond_to(:timestamp) }
  it { should respond_to(:title) }
  it { should respond_to(:full_name) }
  it { should respond_to(:email) }
  it { should respond_to(:phone) }
  it { should respond_to(:contact) }
  it { should respond_to(:section) }
  it { should respond_to(:coverage_type) }
  it { should respond_to(:publish_date) }
  it { should respond_to(:due_date) }
  it { should respond_to(:details) }
  it { should respond_to(:state) }
  it { should respond_to(:loc) }
  it { should respond_to(:date) }
  it { should respond_to(:time) }
  
  it { should be_valid }

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:section) }
  it { should validate_presence_of(:coverage_type) }
  it { should validate_presence_of(:publish_date) }
  it { should validate_presence_of(:due_date) }
  it { should validate_presence_of(:details) }

  it { should validate_not_in_past(:due_date) }
  it { should validate_not_in_past(:publish_date) }

  it { should validate_inclusion_of(:state).in_range(0..6) }
  it { should allow_value('example@domain.com').for(:email) }

  it { should belong_to :daily_member }

  it 'should invalidate past due_date' do
    @job.due_date = Faker::Time.backward(5)
    expect(@job).not_to be_valid
  end

  it 'should invalidate past publish_date' do
    @job.publish_date = Faker::Time.backward(5)
    expect(@job).not_to be_valid
  end

  context 'scoping' do
    before(:each) do
      Job.delete_all # needs to be cear for some reason
      @job1 = FactoryGirl.create(:job, state: 6)
      @job2 = FactoryGirl.create(:job, state: 2, coverage_type: "Stock")
      @job3 = FactoryGirl.create(:job, state: 3, coverage_type: "File Photo")
      @job4 = FactoryGirl.create(:job, state: 4)
      @job5 = FactoryGirl.create(:job, state: 6)
    end

    it '.equal_state' do
      expect(Job.equal_state(6).sort).to match_array([@job1, @job5])
    end

    it '.not_equal_state' do
      expect(Job.not_equal_state(6).sort).to match_array([@job2, @job3, @job4])
    end

    it '.is_stock' do
      expect(Job.is_stock(true).sort).to match_array([@job2, @job3])
    end
  end
end
