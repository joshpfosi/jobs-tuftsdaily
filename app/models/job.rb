class Job < ActiveRecord::Base
  validates :email, format: { with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, multiline: true  }
  validates :title, :section, :coverage_type, :publish_date, :due_date, :details, presence: true

  # TODO refactor all dates into datetime
  validate :date_format
  def date_format
    unless publish_date =~ /\d\d\d\d-\d\d-\d\d/
      errors.add(:publish_date, "bad date format")
    end
    unless due_date =~ /\d\d\d\d-\d\d-\d\d/
      errors.add(:due_date, "bad date format")
    end
  end

  belongs_to :daily_member
end
