class DailyMemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :position, :phone, :day, :back_day, :sports, :notes
  has_many :jobs, embed: :ids, include: true
end
