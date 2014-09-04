class ChangeDetailsStringToText < ActiveRecord::Migration
  def change
    change_column :jobs, :details, :text
  end
end
