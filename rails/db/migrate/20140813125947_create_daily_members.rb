class CreateDailyMembers < ActiveRecord::Migration
  def change
    create_table :daily_members do |t|
      t.string :position
      t.string :name
      t.string :email
      t.string :phone
      t.string :day
      t.string :back_day
      t.text   :notes
      t.string :sports

      t.timestamps
    end
  end
end
