class DailyMember < ActiveRecord::Base
  has_many :jobs
end
