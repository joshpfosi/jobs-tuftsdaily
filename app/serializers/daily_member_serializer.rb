class DailyMemberSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :position, :phone
  has_many :jobs, embed: :ids, include: true
end
