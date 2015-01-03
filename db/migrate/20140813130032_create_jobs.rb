class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string     :title
      t.string    :timestamp
      t.string     :full_name
      t.string     :email
      t.string     :phone
      t.string     :contact
      t.string     :section
      t.string     :coverage_type
      t.string     :due_date
      t.text       :details
      t.integer    :state
      t.string     :loc
      t.string     :date
      t.string     :time
      t.string     :publish_date
      t.text       :notes
      t.belongs_to :daily_member

      t.timestamps
    end
  end
end
