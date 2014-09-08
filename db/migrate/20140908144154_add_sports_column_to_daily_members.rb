class AddSportsColumnToDailyMembers < ActiveRecord::Migration
  def change
    add_column :daily_members, :sports, :string
  end
end
