class AddBackDayAndNotesToDailyMember < ActiveRecord::Migration
  def change
    add_column :daily_members, :back_day, :string
    add_column :daily_members, :notes, :text
  end
end
