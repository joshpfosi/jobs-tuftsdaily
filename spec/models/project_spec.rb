require 'rails_helper'

RSpec.describe Project, :type => :model do
  before { @project = FactoryGirl.create(:project) }

  subject { @project }

  it { should respond_to(:title) }
  it { should respond_to(:author) }
  it { should respond_to(:publish_date) }
  it { should respond_to(:start_date) }
  it { should respond_to(:notes) }
end
