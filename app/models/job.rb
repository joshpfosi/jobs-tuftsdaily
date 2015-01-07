class Job < ActiveRecord::Base
  validates :email, format: { with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, multiline: true  }
  validates :title, :section, :coverage_type, :publish_date, :due_date, :details, presence: true
  validates :state, inclusion: { in: 0..6 }

  # TODO: Refactor some how (see project.rb)
  validate :dates

  def dates
    errors.add(:due_date, "date has occured")     if due_date.nil? || due_date < Time.now
    errors.add(:publish_date, "date has occured") if publish_date.nil? || publish_date < Time.now
  end

  belongs_to :daily_member
end
