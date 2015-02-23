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
  it { should respond_to(:reason) }
  
  it { should be_valid }

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:section) }
  it { should validate_presence_of(:coverage_type) }
  it { should validate_presence_of(:publish_date) }
  it { should validate_presence_of(:due_date) }
  it { should validate_presence_of(:details) }

  it { should validate_inclusion_of(:state).in_range(0..7) }
  it { should allow_value('example@domain.com').for(:email) }

  it { should belong_to :daily_member }

  context 'scoping' do
    before(:each) do
      Job.delete_all # needs to be cear for some reason
      @job1 = FactoryGirl.create(:job, state: 6)
      @job2 = FactoryGirl.create(:job, state: 4)
      @job3 = FactoryGirl.create(:job, state: 6)
    end

    it '.equal_state' do
      expect(Job.equal_state(6).sort).to match_array([@job1, @job3])
    end

    it '.not_equal_state' do
      expect(Job.not_equal_state(6).sort).to match_array([@job2])
    end
  end

  context 'with reason set' do
    before(:each) { subject.reason = "my reason" }

    it { should_not be_valid }

    it 'should be valid with state == 2' do
      subject.state = 2
      should be_valid
    end
  end

  context 'with reason nil' do
    it 'should not be valid with state == 2' do
      subject.reason = nil
      subject.state = 2
      should_not be_valid
    end
  end
end
