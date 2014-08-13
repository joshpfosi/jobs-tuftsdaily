class CreateDailyMembers < ActiveRecord::Migration
  def change
    create_table :daily_members do |t|
      t.string :position
      t.string :name
      t.string :email
      t.string :phone

      t.timestamps
    end
  end
end
