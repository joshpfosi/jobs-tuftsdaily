class JobSerializer < ActiveModel::Serializer
  attributes :id, :timestamp, :title, :full_name, :email, :phone, :contact, :section, :coverage_type, :publish_date, :due_date, :details, :state, :loc, :date, :time, :daily_member_id
end
