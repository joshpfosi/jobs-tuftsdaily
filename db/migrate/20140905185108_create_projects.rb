class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.string :author
      t.string :publish_date
      t.string :start_date
      t.text :notes
    end
  end
end
