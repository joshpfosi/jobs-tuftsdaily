class AddReasonToJobs < ActiveRecord::Migration
  def change
    add_column :jobs, :reason, :string
  end
end
