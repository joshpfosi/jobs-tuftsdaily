require 'rails_helper'

RSpec.describe DailyMember, :type => :model do
  before { @daily_member = FactoryGirl.create(:daily_member) }

  subject { @daily_member }

  it { should respond_to(:name) }
  it { should respond_to(:email) }
  it { should respond_to(:position) }
  it { should respond_to(:phone) }
  it { should respond_to(:day) }
  it { should respond_to(:back_day) }
  it { should respond_to(:sports) }
  it { should respond_to(:notes) }

  it { should be_valid }

  it { should have_many :jobs }

  # TODO shoulda_matchers should work but aren't
  #it { should validate_length_of(:name).is_at_least(3) }
  #it { should validate_length_of(:name).is_at_most(20) }
  it { should validate_inclusion_of(:position).in_array(['Executive Photo Editor', 'Photo Administrator', 'Picture Tufts Editor', 'Picture Tufts Contributor', 'Stock Image Editor', 'Section Liaison', 'Staff Photographer', 'Project Photographer', 'Trainee', 'Inactive'])}
  it { should allow_value('example@domain.com').for(:email) }
  it { should allow_value('402 592 1983').for(:phone) }
end
