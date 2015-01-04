class DailyMember < ActiveRecord::Base
  validates :name, length: { minimum: 3, maximum: 20 }
  validates :email, format: { with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, multiline: true }
  validates :phone, format: { with: /\d\d\d \d\d\d \d\d\d\d/, multiline: true }
  validates :position, presence: true
  has_many :jobs
end
