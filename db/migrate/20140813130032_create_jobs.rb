class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string  :timestamp
      t.string  :title
      t.string  :full_name
      t.string  :email
      t.string  :phone
      t.string  :contact
      t.string  :section
      t.string  :coverage_type
      t.string  :due_date
      t.string  :due_time
      t.string  :details
      t.integer :state
      t.string  :loc
      t.string  :date
      t.string  :time
      t.belongs_to :daily_member

      t.timestamps
    end
  end
end
