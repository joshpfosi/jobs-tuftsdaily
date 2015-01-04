class Job < ActiveRecord::Base
  validates :email, format: { with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, multiline: true  }
  validates :title, :section, :coverage_type, :publish_date, :due_date, :details, presence: true
  belongs_to :daily_member
end
