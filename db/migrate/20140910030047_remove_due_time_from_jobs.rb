class RemoveDueTimeFromJobs < ActiveRecord::Migration
  def change
    remove_column :jobs, :due_time
  end
end
