class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :publish_date, :start_date, :notes
end
