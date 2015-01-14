class IsNotPastValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    record.errors[attribute] << (options[:message] || "date is in past") if value.nil? || value < Date.today
  end
end
