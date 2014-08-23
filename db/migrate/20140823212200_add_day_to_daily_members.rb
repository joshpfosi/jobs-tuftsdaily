class AddDayToDailyMembers < ActiveRecord::Migration
  def change
    add_column :daily_members, :day, :string
  end
end
