class JobSerializer < ActiveModel::Serializer
  attributes :id, :timestamp, :title, :full_name, :email, :phone, :contact, :section, :coverage_type, :due_date, :due_time, :details, :state, :loc, :date, :time
end
