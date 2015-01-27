class DailyMember < ActiveRecord::Base
  validates :name, length: { minimum: 3, maximum: 20 }
  validates :email, format: { with: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i, multiline: true }
  validates :phone, presence: true
  validates :position, inclusion: { in: ['Executive Photo Editor', 'Photo Administrator', 'Picture Tufts Editor', 'Picture Tufts Contributor', 'Stock Image Editor', 'Section Liaison', 'Staff Photographer', 'Project Photographer', 'Trainee', 'Inactive'] }
  
  has_many :jobs
end
