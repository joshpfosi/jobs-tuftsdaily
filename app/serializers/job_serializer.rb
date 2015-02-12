class JobSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :title, :full_name, :email, :phone, :contact, :section, :coverage_type, :publish_date, :due_date, :details, :state, :loc, :date, :time, :reason, :daily_member_id
end
