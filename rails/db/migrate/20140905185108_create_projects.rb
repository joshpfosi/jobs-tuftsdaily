class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string   :title
      t.string   :author
      t.datetime :publish_date
      t.datetime :start_date
      t.text     :notes

      t.timestamps
    end
  end
end
